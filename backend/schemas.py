from pydantic import BaseModel
from typing import Optional

class CreativeDNA(BaseModel):
    niche: str = "Lifestyle"
    style: str = "Cinematic"
    tone: str = "Inspiring"
    audience: str = "Gen Z & Millennials"
    platforms: list[str] = ["Instagram", "YouTube"]

class IdeaRequest(BaseModel):
    idea: str
    dna: CreativeDNA

class VideoRemixRequest(BaseModel):
    url: Optional[str] = None
    dna: CreativeDNA

class ChatRequest(BaseModel):
    message: str
    history: list[dict] = []
    dna: CreativeDNA

class VaultItem(BaseModel):
    id: str
    title: str
    content: str
    tags: list[str] = []
    created_at: str

class ScriptScene(BaseModel):
    scene_number: int
    title: str
    description: str
    dialogue: str
    camera_angle: str
    duration_seconds: int

class StoryboardCard(BaseModel):
    scene_number: int
    visual_description: str
    pose_description: str
    color_palette: list[str]
    mood: str

class ViralTwist(BaseModel):
    title: str
    description: str
    hook: str
    execution_steps: list[str]
    estimated_viral_score: int

class SEOPackage(BaseModel):
    title: str
    description: str
    hashtags: list[str]
    keywords: list[str]
    best_posting_times: list[str]

class GenerateResponse(BaseModel):
    script: list[ScriptScene]
    storyboard: list[StoryboardCard]
    seo: SEOPackage
    creative_direction: str
    posting_schedule: list[str]

class RemixResponse(BaseModel):
    viral_analysis: str
    creative_twists: list[ViralTwist]
    pose_guide: list[StoryboardCard]
    seo_package: SEOPackage
    platform_strategy: str

class ChatResponse(BaseModel):
    reply: str
    suggestions: list[str]

class VaultResponse(BaseModel):
    items: list[VaultItem]
