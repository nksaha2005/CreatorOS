export interface CreativeDNA {
  niche: string;
  style: string;
  tone: string;
  audience: string;
  platforms: string[];
}

export interface ScriptScene {
  scene_number: number;
  title: string;
  description: string;
  dialogue: string;
  camera_angle: string;
  duration_seconds: number;
}

export interface StoryboardCard {
  scene_number: number;
  visual_description: string;
  pose_description: string;
  color_palette: string[];
  mood: string;
}

export interface ViralTwist {
  title: string;
  description: string;
  hook: string;
  execution_steps: string[];
  estimated_viral_score: number;
}

export interface SEOPackage {
  title: string;
  description: string;
  hashtags: string[];
  keywords: string[];
  best_posting_times: string[];
}

export interface GenerateResponse {
  script: ScriptScene[];
  storyboard: StoryboardCard[];
  seo: SEOPackage;
  creative_direction: string;
  posting_schedule: string[];
}

export interface RemixResponse {
  viral_analysis: string;
  creative_twists: ViralTwist[];
  pose_guide: StoryboardCard[];
  seo_package: SEOPackage;
  platform_strategy: string;
}

export interface ChatResponse {
  reply: string;
  suggestions: string[];
}

export interface VaultItem {
  id: string;
  title: string;
  content: string;
  tags: string[];
  created_at: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
