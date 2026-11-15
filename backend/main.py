"""Creator OS Backend API"""
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
import tempfile
import uuid
from pathlib import Path
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

from schemas import IdeaRequest, ChatRequest, CreativeDNA
from agents import run_idea_pipeline, run_remix_pipeline, run_chat

app = FastAPI(
    title="Creator OS API",
    version="1.0.0",
    description="AI Creative Studio Backend - Powered by Gemini 4 Hydrogen"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory vault store
VAULT_STORE: list[dict] = [
    {
        "id": "1",
        "title": "Morning Motivation Concept",
        "content": "5AM routine transformation video showing before/after productivity gains with time-lapse B-roll and inspiring narration",
        "tags": ["Lifestyle", "Productivity"],
        "created_at": "2026-11-14T08:00:00"
    },
    {
        "id": "2",
        "title": "iPhone vs Android Camera Battle",
        "content": "Side-by-side comparison reel in golden hour lighting at iconic city locations with real people reactions",
        "tags": ["Tech", "Review"],
        "created_at": "2026-11-13T14:30:00"
    },
    {
        "id": "3",
        "title": "Street Food World Tour",
        "content": "30-second flavor explosion reels from 5 different countries featuring the same dish prepared differently",
        "tags": ["Food", "Travel"],
        "created_at": "2026-11-12T10:00:00"
    },
    {
        "id": "4",
        "title": "ASMR Study With Me",
        "content": "3-hour cozy library session with rain sounds, keyboard ASMR, and aesthetic flat-lay shots of notes",
        "tags": ["Education", "ASMR"],
        "created_at": "2026-11-11T20:00:00"
    },
    {
        "id": "5",
        "title": "Gym Transformation 90 Days",
        "content": "Weekly progress montage with nutrition breakdown overlay and motivational narration tracking real results",
        "tags": ["Fitness", "Motivation"],
        "created_at": "2026-11-10T07:00:00"
    },
    {
        "id": "6",
        "title": "Aesthetic Room Makeover on 500 Dollar Budget",
        "content": "Before/after satisfying room transformation using thrift store finds and DIY hacks with shopping breakdown",
        "tags": ["Lifestyle", "Design"],
        "created_at": "2026-11-09T16:00:00"
    },
]


@app.get("/")
async def root():
    return {"status": "ok", "app": "Creator OS API", "version": "1.0.0"}


@app.get("/api/health")
async def health():
    return {
        "status": "healthy",
        "model": "gemini-4-hydrogen",
        "timestamp": datetime.utcnow().isoformat()
    }


@app.post("/api/generate")
async def generate(request: IdeaRequest):
    try:
        result = await run_idea_pipeline(request.idea, request.dna.model_dump())
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/remix-video")
async def remix_video(
    file: UploadFile | None = File(None),
    url: str | None = Form(None),
    dna: str = Form(...)
):
    try:
        dna_dict = json.loads(dna)
        video_path = None

        if file and file.filename:
            suffix = Path(file.filename).suffix or ".mp4"
            tmp = Path(tempfile.gettempdir()) / f"creatoros_{uuid.uuid4().hex}{suffix}"
            with open(tmp, "wb") as f_out:
                content = await file.read()
                f_out.write(content)
            video_path = str(tmp)
        elif url:
            try:
                from downloader import download_video
                dl_path = download_video(url)
                video_path = str(dl_path)
            except Exception as dl_err:
                print(f"Download failed, proceeding URL-only: {dl_err}")

        result = await run_remix_pipeline(video_path, url, dna_dict)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/chat")
async def chat(request: ChatRequest):
    try:
        result = await run_chat(request.message, request.history, request.dna.model_dump())
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/vault")
async def get_vault():
    return {"items": VAULT_STORE}


@app.post("/api/vault")
async def add_vault_item(item: dict):
    new_item = {
        "id": str(uuid.uuid4())[:8],
        "title": item.get("title", "Untitled Idea"),
        "content": item.get("content", ""),
        "tags": item.get("tags", []),
        "created_at": datetime.utcnow().isoformat()
    }
    VAULT_STORE.insert(0, new_item)
    return new_item
