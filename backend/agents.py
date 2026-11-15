"""4-Agent Swarm Pipeline using google-genai Interactions API"""
import os
import json
import base64
from pathlib import Path
from google import genai
from dotenv import load_dotenv

load_dotenv()

client = genai.Client()
SAMPLE_DEMO_PATH = Path(__file__).parent / "sample_demo.json"


def load_demo() -> dict:
    with open(SAMPLE_DEMO_PATH) as f:
        return json.load(f)


def inject_dna(dna: dict) -> str:
    return (
        f"Creator DNA Profile:\n"
        f"- Niche: {dna.get('niche', 'Lifestyle')}\n"
        f"- Style: {dna.get('style', 'Cinematic')}\n"
        f"- Tone: {dna.get('tone', 'Inspiring')}\n"
        f"- Target Audience: {dna.get('audience', 'Millennials')}\n"
        f"- Platforms: {', '.join(dna.get('platforms', ['Instagram', 'YouTube']))}\n"
    )


def parse_json_response(text: str) -> dict:
    """Extract and parse JSON from model response, handling code fences."""
    text = text.strip()
    if "```json" in text:
        text = text.split("```json")[1].split("```")[0]
    elif "```" in text:
        text = text.split("```")[1].split("```")[0]
    return json.loads(text.strip())


async def run_idea_pipeline(idea: str, dna: dict) -> dict:
    try:
        dna_context = inject_dna(dna)
        prompt = (
            dna_context + "\n"
            "You are a 4-agent creative content swarm (Director, Scriptwriter, Visual Director, SEO Strategist).\n"
            f"Content Idea: {idea}\n\n"
            "Generate a complete content package. Return ONLY valid JSON with this exact structure:\n"
            "{\n"
            '  "creative_direction": "2-3 sentence artistic vision paragraph",\n'
            '  "posting_schedule": ["Day 1: ...", "Day 2: ...", "Day 3: ...", "Day 4: ...", "Day 5: ...", "Day 6: ...", "Day 7: ..."],\n'
            '  "script": [\n'
            '    {"scene_number": 1, "title": "Hook", "description": "Scene setup", "dialogue": "Exact words", "camera_angle": "Camera position", "duration_seconds": 15},\n'
            '    {"scene_number": 2, ...},\n'
            '    {"scene_number": 3, ...},\n'
            '    {"scene_number": 4, ...},\n'
            '    {"scene_number": 5, ...}\n'
            "  ],\n"
            '  "storyboard": [\n'
            '    {"scene_number": 1, "visual_description": "What viewer sees", "pose_description": "Creator body position", "color_palette": ["#hex1", "#hex2", "#hex3"], "mood": "Energy level"},\n'
            '    ... 5 cards\n'
            "  ],\n"
            '  "seo": {\n'
            '    "title": "Compelling title with power words",\n'
            '    "description": "Full 150-word description with keywords",\n'
            '    "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5", "#tag6", "#tag7", "#tag8", "#tag9", "#tag10"],\n'
            '    "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],\n'
            '    "best_posting_times": ["Monday 6PM EST", "Wednesday 12PM EST", "Friday 9AM EST"]\n'
            "  }\n"
            "}"
        )
        response = client.interactions.create(
            model="gemini-4-hydrogen",
            input=prompt
        )
        return parse_json_response(response.output_text or "")
    except Exception as e:
        print(f"Idea pipeline error (falling back to demo): {e}")
        return load_demo()["idea_demo"]


async def run_remix_pipeline(video_path: str | None, url: str | None, dna: dict) -> dict:
    try:
        dna_context = inject_dna(dna)
        base_prompt = (
            dna_context + "\n"
            "You are a 4-agent viral content analysis swarm (Trend Analyst, Creative Twist Generator, Pose Director, SEO Packager).\n"
            "Analyze this viral video and generate a complete remix package.\n"
            "Return ONLY valid JSON with this exact structure:\n"
            "{\n"
            '  "viral_analysis": "3-4 sentence analysis of WHY this went viral (hook timing, emotional trigger, shareability)",\n'
            '  "platform_strategy": "2-3 sentence cross-platform strategy (Instagram vs YouTube vs TikTok approach)",\n'
            '  "creative_twists": [\n'
            '    {"title": "Twist Name", "description": "What makes it unique", "hook": "Opening line", "execution_steps": ["Step 1", "Step 2", "Step 3", "Step 4"], "estimated_viral_score": 92},\n'
            '    {"title": "Twist 2", ...},\n'
            '    {"title": "Twist 3", ...}\n'
            "  ],\n"
            '  "pose_guide": [\n'
            '    {"scene_number": 1, "visual_description": "Camera setup and framing", "pose_description": "Exact body position", "color_palette": ["#hex1", "#hex2"], "mood": "Energy"},\n'
            '    {"scene_number": 2, ...},\n'
            '    {"scene_number": 3, ...}\n'
            "  ],\n"
            '  "seo_package": {\n'
            '    "title": "Remix video title",\n'
            '    "description": "Full description",\n'
            '    "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5", "#tag6", "#tag7", "#tag8", "#tag9", "#tag10"],\n'
            '    "keywords": ["kw1", "kw2", "kw3", "kw4", "kw5"],\n'
            '    "best_posting_times": ["time1", "time2", "time3"]\n'
            "  }\n"
            "}"
        )

        if video_path and Path(video_path).exists():
            with open(video_path, "rb") as f:
                video_bytes = f.read()
            video_b64 = base64.b64encode(video_bytes).decode()
            response = client.interactions.create(
                model="gemini-4-hydrogen",
                input=[
                    {"type": "text", "text": base_prompt},
                    {"type": "video", "data": video_b64, "mime_type": "video/mp4"}
                ]
            )
        else:
            url_note = f"\nVideo URL for context: {url}" if url else "\nNo video provided - generate creative analysis for a typical viral social media tech/lifestyle video."
            response = client.interactions.create(
                model="gemini-4-hydrogen",
                input=base_prompt + url_note
            )

        return parse_json_response(response.output_text or "")
    except Exception as e:
        print(f"Remix pipeline error (falling back to demo): {e}")
        return load_demo()["remix_demo"]


async def run_chat(message: str, history: list, dna: dict) -> dict:
    try:
        dna_context = inject_dna(dna)
        conversation_parts = [
            "You are a creative AI co-pilot for content creators. Be concise, inspiring, and actionable.\n",
            dna_context + "\n",
            "Conversation history:\n"
        ]
        for msg in history[-6:]:
            role = msg.get("role", "user").upper()
            content = msg.get("content", "")
            conversation_parts.append(f"{role}: {content}\n")

        conversation_parts.append(f"\nUSER: {message}\n\n")
        conversation_parts.append(
            'Respond with valid JSON: {"reply": "your helpful response", "suggestions": ["suggestion1", "suggestion2", "suggestion3"]}'
        )

        response = client.interactions.create(
            model="gemini-4-hydrogen",
            input="".join(conversation_parts)
        )
        return parse_json_response(response.output_text or "")
    except Exception as e:
        return {
            "reply": "I am here to help you create amazing content! Tell me about your next video idea and I will help you make it go viral.",
            "suggestions": ["Generate a script for my next video", "Remix a trending video in my niche", "Plan my content calendar for this week"]
        }
