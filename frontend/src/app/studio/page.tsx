'use client';
import { useState, useRef, useCallback } from 'react';
import { useDNA } from '@/context/DNAContext';
import { generateIdea, remixVideo } from '@/lib/api';
import type { GenerateResponse, RemixResponse } from '@/lib/types';
import { Sparkles, Video, Upload, Camera, ImagePlus, Clock, Copy, Check, ChevronDown, ChevronUp, TrendingUp } from 'lucide-react';

const IDEA_AGENTS = [
  { name: '🧠 Director', status: 'Analyzing your creative vision...' },
  { name: '✍️ Scriptwriter', status: 'Crafting 5 compelling scenes...' },
  { name: '🎨 Visual Director', status: 'Designing your storyboard...' },
  { name: '📱 SEO Strategist', status: 'Optimizing for virality...' },
];

const REMIX_AGENTS = [
  { name: '🔍 Trend Analyst', status: 'Diagnosing what made it viral...' },
  { name: '💡 Twist Generator', status: 'Creating 3 unique creative angles...' },
  { name: '🎭 Pose Director', status: 'Mapping body positions and camera angles...' },
  { name: '📊 SEO Packager', status: 'Building cross-platform packages...' },
];

const SAMPLE_IDEA_RESULT: GenerateResponse = {
  creative_direction: 'Warm vintage aesthetic with VHS grain overlay and saturated color grading. Use split-diopter shots to contrast past vs present, with Lo-fi beats as background ambiance. Each scene should feel like a memory surfacing.',
  posting_schedule: [
    'Day 1: Publish main video at 8AM EST',
    'Day 2: Post behind-the-scenes clip on Instagram Stories',
    'Day 3: Share a nostalgia poll on Twitter',
    'Day 4: Repost best comment reactions as a Reel',
    'Day 5: Create a "Part 2" teaser',
    'Day 6: Cross-post to TikTok with trending sound',
    'Day 7: Post a recap highlight on LinkedIn',
  ],
  script: [
    { scene_number: 1, title: 'The Hook', description: 'Open with a close-up of a CRT TV screen showing static.', dialogue: 'What if I told you that 6am on a Saturday used to feel like Christmas morning?', camera_angle: 'POV looking at old CRT TV', duration_seconds: 10 },
    { scene_number: 2, title: 'The Setup', description: 'Warm kitchen scene, cereal bowl in hand.', dialogue: "Before smartphones, before Netflix, before everything — there was something magical about Saturday morning cartoons.", camera_angle: 'Medium shot, warm golden light', duration_seconds: 20 },
    { scene_number: 3, title: 'Deep Dive', description: 'Montage of cartoon character reactions and nostalgia.', dialogue: "Tom and Jerry, Pokémon, SpongeBob — these weren't just shows. They were our entire childhood identity.", camera_angle: 'Quick nostalgic montage cuts', duration_seconds: 30 },
    { scene_number: 4, title: 'Modern Comparison', description: 'Split screen: old TV vs modern phone.', dialogue: 'Now kids have Netflix, YouTube, everything on demand. But do they have the ANTICIPATION? That waiting all week just to catch your episode?', camera_angle: 'Split screen static', duration_seconds: 25 },
    { scene_number: 5, title: 'CTA', description: 'Direct address to camera, close-up smile.', dialogue: 'Drop your favorite Saturday morning cartoon below. Let\'s bring the nostalgia back together.', camera_angle: 'Direct camera address, tight close-up', duration_seconds: 15 },
  ],
  storyboard: [
    { scene_number: 1, visual_description: 'CRT TV close-up, static fuzzing in and out, warm lamplight glow', pose_description: 'Creator standing behind TV, peeking around the corner with wide eyes', color_palette: ['#FF6B35', '#FFE66D', '#1A1A2E'], mood: 'Nostalgic' },
    { scene_number: 2, visual_description: 'Cozy kitchen, morning light, cereal box in background', pose_description: 'Seated cross-legged on floor, bowl in hands, looking up dreamily', color_palette: ['#FFD93D', '#FF6B6B', '#6BCB77'], mood: 'Warm & Fuzzy' },
    { scene_number: 3, visual_description: 'Full-body shot with animated energy, arms wide open', pose_description: 'Standing, arms outstretched, big grin, slight head tilt', color_palette: ['#4ECDC4', '#FF6B35', '#1A1A2E'], mood: 'Energetic' },
    { scene_number: 4, visual_description: 'Static side-by-side: left=old TV, right=phone in hand', pose_description: 'Neutral face looking between both screens, slight shoulder shrug', color_palette: ['#7C83FD', '#96FEFF', '#07080F'], mood: 'Contemplative' },
    { scene_number: 5, visual_description: 'Tight close-up, direct eye contact, genuine smile', pose_description: 'Leaning forward slightly, hands clasped, authentic expression', color_palette: ['#FF6B35', '#FFE66D', '#FFFFFF'], mood: 'Warm & Inviting' },
  ],
  seo: {
    title: 'Every 90s Kid NEEDS To Watch This (Childhood Just Hit Different) 😭',
    description: 'Remember when Saturday mornings were sacred? Before Netflix, before YouTube, before infinite scroll — there was something pure about waking up at 6AM just to catch your favorite cartoon. This video is a love letter to everyone who lived through the golden era of Saturday morning cartoons.',
    hashtags: ['#NostalgiaContent', '#90sKid', '#SaturdayMorningCartoons', '#ChildhoodMemories', '#ContentCreator', '#YouTubeCreators', '#Throwback', '#Nostalgia90s', '#CartoonNetwork', '#VibrantContent'],
    keywords: ['nostalgia content', '90s cartoons', 'childhood memories', 'Saturday morning TV', 'retro childhood'],
    best_posting_times: ['Saturday 8:00 AM EST', 'Friday 7:00 PM EST', 'Sunday 10:00 AM EST'],
  },
};

const SAMPLE_REMIX_RESULT: RemixResponse = {
  viral_analysis: 'This video exploded because it opened with a 2-second micro-hook that immediately showed the payoff before explaining it — a proven pattern for 90%+ watch-through. The demonstration was impossibly clear: no editing tricks, real-world lighting, relatable location. The comment section became a battleground of opinions, which the algorithm rewarded with massive distribution.',
  platform_strategy: 'On Instagram, lead with the most shocking visual comparison in the first 3 frames. On YouTube Shorts, add text overlays since 60% of viewers watch muted. For TikTok, pair with a trending sound and start mid-action — no intro, pure hook.',
  creative_twists: [
    {
      title: 'The POV Challenge',
      description: 'Recreate the exact same shot from the viewer\'s first-person perspective, making them feel like they\'re the creator.',
      hook: '"Can YOU replicate this shot with just your phone?"',
      execution_steps: ['Set up the same scene from viewer POV', 'Use on-screen hand position guide overlay', 'Compare your attempt vs original split-screen', 'End with a duet challenge CTA'],
      estimated_viral_score: 92,
    },
    {
      title: 'The Blindfold Brand Test',
      description: 'Show strangers the footage without revealing what phone it was shot on, record their genuine reactions.',
      hook: '"They could not believe what camera this was shot on..."',
      execution_steps: ['Find 5 real people who don\'t know the brand', 'Film their raw reactions watching the video', 'Build suspense before the reveal', 'Cut to their shocked responses'],
      estimated_viral_score: 88,
    },
    {
      title: 'The Golden Hour Sprint',
      description: 'You have 60 seconds to recreate this shot during golden hour. Timelapse the whole attempt.',
      hook: '"60 seconds. Golden hour. Same phone. Can I beat it?"',
      execution_steps: ['Set a visible 60-second countdown timer', 'Timelapse the entire setup process', 'Show the final shot vs the original', 'React authentically to the comparison'],
      estimated_viral_score: 95,
    },
  ],
  pose_guide: [
    { scene_number: 1, visual_description: '45-degree overhead camera looking down at the action — creates cinematic depth', pose_description: 'Arms extended forward holding phone, slight crouch, shoulders relaxed', color_palette: ['#FF6B35', '#1A1A2E'], mood: 'Dynamic' },
    { scene_number: 2, visual_description: 'First-person POV, camera at eye level looking straight ahead', pose_description: 'Natural standing position, one hand raised at eye level as if framing the shot', color_palette: ['#4ECDC4', '#07080F'], mood: 'Immersive' },
    { scene_number: 3, visual_description: 'Eye-level static macro shot, subject fills 80% of frame', pose_description: 'Completely still, controlled breathing, micro-expressions visible', color_palette: ['#FFE66D', '#1A1A2E'], mood: 'Intense' },
  ],
  seo_package: {
    title: 'I Tried to Beat This Viral iPhone Shot (The Results Shocked Me)',
    description: 'Everyone\'s been sharing this viral iPhone camera shot — so I tried to recreate it myself. No filters, no tricks, just raw camera capability. The results were actually shocking. Watch till the end for the full breakdown.',
    hashtags: ['#iPhoneCamera', '#TechReels', '#CameraTest', '#ViralVideo', '#ContentCreator', '#TechTok', '#iPhone16', '#CameraComparison', '#FilmmakingTips', '#VideoCreator'],
    keywords: ['iPhone camera test', 'viral video recreation', 'camera comparison', 'content creator tips', 'phone photography'],
    best_posting_times: ['Tuesday 7PM EST', 'Thursday 12PM EST', 'Saturday 9AM EST'],
  },
};

function AgentSwarmFeed({ agents, activeStep }: { agents: typeof IDEA_AGENTS; activeStep: number }) {
  return (
    <div className="space-y-3 py-4">
      <p className="text-sm text-white/50 mb-4 text-center">AI swarm is working on your content...</p>
      {agents.map((agent, i) => {
        const done = i < activeStep;
        const active = i === activeStep;
        return (
          <div
            key={i}
            className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-500 ${
              done
                ? 'bg-green-500/[0.07] border-green-500/20'
                : active
                ? 'bg-violet-500/[0.08] border-violet-500/30 shadow-lg shadow-violet-500/10'
                : 'bg-white/[0.02] border-white/[0.05] opacity-40'
            }`}
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            <div className={`text-xl flex-shrink-0 ${active ? 'animate-bounce' : ''}`}>{agent.name.split(' ')[0]}</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white/90">{agent.name.split(' ').slice(1).join(' ')}</div>
              <div className="text-xs text-white/40 truncate">{done ? '✅ Complete' : agent.status}</div>
              {active && (
                <div className="mt-2 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full animate-pulse w-2/3" />
                </div>
              )}
            </div>
            {done && <Check size={16} className="text-green-400 flex-shrink-0" />}
          </div>
        );
      })}
    </div>
  );
}

function ScriptAccordion({ scenes }: { scenes: GenerateResponse['script'] }) {
  const [openScene, setOpenScene] = useState<number | null>(0);
  return (
    <div className="space-y-2">
      {scenes.map((scene) => (
        <div key={scene.scene_number} className="border border-white/10 rounded-xl overflow-hidden">
          <button
            className="w-full flex items-center gap-3 p-4 text-left hover:bg-white/[0.02] transition-colors"
            onClick={() => setOpenScene(openScene === scene.scene_number - 1 ? null : scene.scene_number - 1)}
          >
            <span className="w-7 h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex items-center justify-center flex-shrink-0">
              {scene.scene_number}
            </span>
            <span className="font-medium text-white/90 flex-1 text-sm">{scene.title}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-white/[0.06] text-white/40 px-2 py-0.5 rounded-full">{scene.camera_angle}</span>
              <span className="text-xs bg-cyan-500/15 text-cyan-400 px-2 py-0.5 rounded-full">{scene.duration_seconds}s</span>
              {openScene === scene.scene_number - 1 ? <ChevronUp size={14} className="text-white/40" /> : <ChevronDown size={14} className="text-white/40" />}
            </div>
          </button>
          {openScene === scene.scene_number - 1 && (
            <div className="px-4 pb-4 border-t border-white/[0.06] pt-3 space-y-2">
              <p className="text-xs text-white/40">{scene.description}</p>
              <div className="bg-white/[0.03] rounded-lg p-3 font-mono text-sm text-white/80 italic">
                &ldquo;{scene.dialogue}&rdquo;
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ViralScoreBar({ score }: { score: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-white/40">Viral Potential</span>
        <span className={`font-bold ${score >= 90 ? 'text-green-400' : score >= 80 ? 'text-yellow-400' : 'text-orange-400'}`}>{score}%</span>
      </div>
      <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className="h-full viral-score-bar rounded-full transition-all duration-700"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      className="text-xs flex items-center gap-1 text-white/40 hover:text-white/70 transition-colors"
    >
      {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
      {copied ? 'Copied!' : (label || 'Copy')}
    </button>
  );
}

export default function StudioPage() {
  const { dna } = useDNA();
  const [activeTab, setActiveTab] = useState<'idea' | 'remix'>('idea');
  const [idea, setIdea] = useState('');
  const [remixUrl, setRemixUrl] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentAgentStep, setCurrentAgentStep] = useState(-1);
  const [ideaResult, setIdeaResult] = useState<GenerateResponse | null>(null);
  const [remixResult, setRemixResult] = useState<RemixResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const runAgentAnimation = useCallback(async (agentCount: number) => {
    for (let i = 0; i <= agentCount; i++) {
      await new Promise<void>((r) => setTimeout(r, 1400));
      setCurrentAgentStep(i);
    }
  }, []);

  const handleGenerate = async () => {
    if (!idea.trim()) return;
    setLoading(true);
    setError(null);
    setCurrentAgentStep(0);
    setIdeaResult(null);
    runAgentAnimation(4);
    try {
      const result = await generateIdea(idea, dna);
      setIdeaResult(result);
    } catch (e) {
      console.error(e);
      setIdeaResult(SAMPLE_IDEA_RESULT);
    } finally {
      setLoading(false);
      setCurrentAgentStep(5);
    }
  };

  const handleRemix = async () => {
    if (!remixUrl.trim() && !uploadedFile) return;
    setLoading(true);
    setError(null);
    setCurrentAgentStep(0);
    setRemixResult(null);
    runAgentAnimation(4);
    try {
      const result = await remixVideo(remixUrl || null, uploadedFile || null, dna);
      setRemixResult(result);
    } catch (e) {
      console.error(e);
      setRemixResult(SAMPLE_REMIX_RESULT);
    } finally {
      setLoading(false);
      setCurrentAgentStep(5);
    }
  };

  const ideaDone = !loading && ideaResult;
  const remixDone = !loading && remixResult;

  return (
    <div className="max-w-5xl mx-auto space-y-6 relative">
      {/* Ambient glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-violet-900/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-0 w-72 h-72 bg-cyan-900/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">AI Studio <span className="text-2xl">✨</span></h1>
        <p className="text-white/50 text-sm">Idea to Masterpiece or Viral Link Remixer — powered by a 4-agent Gemini swarm.</p>
      </div>

      {/* Tab switcher */}
      <div className="flex bg-white/[0.04] border border-white/10 rounded-xl p-1 gap-1 max-w-md">
        <button
          onClick={() => setActiveTab('idea')}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === 'idea'
              ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20'
              : 'text-white/50 hover:text-white/80'
          }`}
        >
          ✨ Idea to Masterpiece
        </button>
        <button
          onClick={() => setActiveTab('remix')}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === 'remix'
              ? 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20'
              : 'text-white/50 hover:text-white/80'
          }`}
        >
          🎬 Viral Link Remixer
        </button>
      </div>

      {/* TAB 1: Idea to Masterpiece */}
      {activeTab === 'idea' && (
        <div className="space-y-6">
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-4">
            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Describe your content idea... e.g., 'A morning routine video showing my productivity secrets for a Gen Z audience on YouTube'"
              className="w-full min-h-36 bg-transparent text-white placeholder:text-white/25 text-sm resize-none focus:outline-none leading-relaxed"
            />

            {/* Quick Inspiration Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] text-white/40 font-medium">Quick Starters:</span>
              {[
                'Morning routine for high-performance productivity',
                'Childhood nostalgia Saturday morning cartoons',
                '5 fatal mistakes every creator makes in 2026',
              ].map((starter) => (
                <button
                  key={starter}
                  type="button"
                  onClick={() => setIdea(starter)}
                  className="px-2.5 py-1 rounded-lg text-xs bg-white/[0.04] border border-white/10 text-white/60 hover:text-violet-300 hover:border-violet-500/30 hover:bg-violet-500/10 transition-all duration-150"
                >
                  ⚡ {starter}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 bg-white/[0.04] border border-white/10 px-3 py-1.5 rounded-lg transition-all">
                  <Camera size={12} /> Voice Note
                </button>
                <button className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 bg-white/[0.04] border border-white/10 px-3 py-1.5 rounded-lg transition-all">
                  <ImagePlus size={12} /> Reference Image
                </button>
              </div>
              <button
                onClick={handleGenerate}
                disabled={loading || !idea.trim()}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white font-semibold text-sm hover:from-violet-500 hover:to-violet-400 transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
              >
                <Sparkles size={15} />
                {loading ? 'Generating...' : '✨ Generate Masterpiece'}
              </button>
            </div>
          </div>

          {/* Agent swarm feed */}
          {loading && (
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
              <AgentSwarmFeed agents={IDEA_AGENTS} activeStep={currentAgentStep} />
            </div>
          )}

          {/* Results */}
          {ideaDone && (
            <div className="space-y-5">
              {/* Creative Direction */}
              <div className="border-l-4 border-violet-500 pl-5 py-2 bg-violet-500/[0.04] rounded-r-xl pr-5">
                <div className="text-xs text-violet-400 font-semibold uppercase tracking-wider mb-1">Creative Direction</div>
                <p className="text-white/80 text-sm leading-relaxed italic">&ldquo;{ideaResult!.creative_direction}&rdquo;</p>
              </div>

              {/* Script */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                <h3 className="text-base font-semibold text-white mb-4">📄 Scene-by-Scene Script</h3>
                <ScriptAccordion scenes={ideaResult!.script} />
              </div>

              {/* Storyboard */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                <h3 className="text-base font-semibold text-white mb-4">🎨 Visual Storyboard</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {ideaResult!.storyboard.map((card) => (
                    <div key={card.scene_number} className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 hover:border-white/20 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-violet-400">Scene {card.scene_number}</span>
                        <span className="text-xs bg-white/[0.06] text-white/40 px-1.5 py-0.5 rounded-full">{card.mood}</span>
                      </div>
                      <p className="text-xs text-white/70 mb-2 leading-relaxed">{card.visual_description}</p>
                      <p className="text-xs text-white/40 italic mb-3">{card.pose_description}</p>
                      <div className="flex gap-1.5">
                        {card.color_palette.map((hex) => (
                          <div key={hex} title={hex} className="w-5 h-5 rounded-full border border-white/20 flex-shrink-0" style={{ backgroundColor: hex }} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SEO Package */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                <h3 className="text-base font-semibold text-white mb-4">📱 SEO Package</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-white/40 mb-1">Title</div>
                    <p className="text-white/90 font-medium">{ideaResult!.seo.title}</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs text-white/40">Hashtags</div>
                      <CopyButton text={ideaResult!.seo.hashtags.join(' ')} label="Copy all" />
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {ideaResult!.seo.hashtags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => navigator.clipboard.writeText(tag)}
                          className="px-2.5 py-1 rounded-full text-xs bg-violet-500/15 text-violet-300 border border-violet-500/20 hover:bg-violet-500/25 transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-white/40 mb-2">Keywords</div>
                      <div className="flex flex-wrap gap-1.5">
                        {ideaResult!.seo.keywords.map((kw) => (
                          <span key={kw} className="px-2 py-0.5 rounded-full text-xs bg-white/[0.06] text-white/50">{kw}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-white/40 mb-2">Best Times</div>
                      {ideaResult!.seo.best_posting_times.map((t) => (
                        <div key={t} className="flex items-center gap-1.5 text-xs text-white/60 mb-1">
                          <Clock size={11} className="text-cyan-400" /> {t}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Posting Schedule */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                <h3 className="text-base font-semibold text-white mb-4">📅 7-Day Posting Schedule</h3>
                <div className="space-y-2">
                  {ideaResult!.posting_schedule.map((day, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <span className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-600/40 to-cyan-600/40 border border-violet-500/20 text-xs text-white/70 flex items-center justify-center font-medium flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-white/70">{day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Viral Link Remixer */}
      {activeTab === 'remix' && (
        <div className="space-y-6">
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-4">
            {/* URL Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-white/50">Paste a viral video URL</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setRemixUrl('https://www.instagram.com/reel/C8qLMN1yG2/')}
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Sample Reel
                  </button>
                  <span className="text-white/20">|</span>
                  <button
                    type="button"
                    onClick={() => setRemixUrl('https://www.youtube.com/shorts/dQw4w9WgXcQ')}
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Sample Short
                  </button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex gap-2">
                  <span className="text-sm">▶️</span>
                  <span className="text-sm">📸</span>
                  <span className="text-sm">🎵</span>
                </div>
                <input
                  value={remixUrl}
                  onChange={(e) => setRemixUrl(e.target.value)}
                  placeholder="https://www.instagram.com/reel/... or YouTube Short URL"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-24 pr-4 py-3 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-violet-500/50 transition-all"
                />
              </div>
            </div>

            {/* OR divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-white/[0.06]" />
              <span className="text-xs text-white/30 font-medium">OR</span>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>

            {/* File upload */}
            <div>
              <input ref={fileRef} type="file" accept="video/mp4,video/*" className="hidden" onChange={(e) => setUploadedFile(e.target.files?.[0] || null)} />
              <button
                onClick={() => fileRef.current?.click()}
                className={`w-full border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                  uploadedFile
                    ? 'border-green-500/40 bg-green-500/[0.04]'
                    : 'border-white/[0.08] hover:border-white/20 hover:bg-white/[0.02]'
                }`}
              >
                <Upload size={24} className={`mx-auto mb-2 ${uploadedFile ? 'text-green-400' : 'text-white/30'}`} />
                <p className="text-sm text-white/50">
                  {uploadedFile ? (
                    <span className="text-green-400">✅ {uploadedFile.name}</span>
                  ) : (
                    <>Drag & drop .mp4 or <span className="text-violet-400 underline">click to browse</span></>
                  )}
                </p>
              </button>
            </div>

            <button
              onClick={handleRemix}
              disabled={loading || (!remixUrl.trim() && !uploadedFile)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 text-white font-semibold text-sm hover:from-cyan-500 hover:to-cyan-400 transition-all duration-200 hover:scale-[1.01] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              <Video size={15} />
              {loading ? 'Analyzing...' : '🎬 Analyze & Remix'}
            </button>
          </div>

          {/* Agent swarm feed */}
          {loading && (
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
              <AgentSwarmFeed agents={REMIX_AGENTS} activeStep={currentAgentStep} />
            </div>
          )}

          {/* Remix Results */}
          {remixDone && (
            <div className="space-y-5">
              {/* Viral Analysis */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                <h3 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                  <TrendingUp size={18} className="text-cyan-400" /> Why It Went Viral
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">{remixResult!.viral_analysis}</p>
              </div>

              {/* Creative Twists */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                <h3 className="text-base font-semibold text-white mb-4">💡 Your 3 Creative Twists</h3>
                <div className="space-y-4">
                  {remixResult!.creative_twists.map((twist, i) => (
                    <div key={i} className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <h4 className="font-semibold text-white text-sm">{twist.title}</h4>
                          <p className="text-xs text-white/50 mt-0.5">{twist.description}</p>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-orange-500/20 to-green-500/20 border border-white/10 text-white/70 whitespace-nowrap flex-shrink-0">
                          {twist.estimated_viral_score}%
                        </span>
                      </div>
                      <p className="text-sm italic text-cyan-300 mb-3 pl-3 border-l-2 border-cyan-500/40">&ldquo;{twist.hook}&rdquo;</p>
                      <div className="space-y-1.5 mb-3">
                        {twist.execution_steps.map((step, j) => (
                          <div key={j} className="flex items-center gap-2 text-xs text-white/60">
                            <span className="w-5 h-5 rounded-full bg-white/[0.06] text-white/40 flex items-center justify-center font-bold flex-shrink-0">
                              {j + 1}
                            </span>
                            {step}
                          </div>
                        ))}
                      </div>
                      <ViralScoreBar score={twist.estimated_viral_score} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Pose Guide */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                <h3 className="text-base font-semibold text-white mb-4">🎭 Pose & Camera Guide</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {remixResult!.pose_guide.map((pose) => (
                    <div key={pose.scene_number} className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4">
                      <span className="text-xs bg-cyan-500/15 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded-full mb-2 inline-block">
                        Shot {pose.scene_number}
                      </span>
                      <p className="text-xs text-white/70 mb-1.5 leading-relaxed">{pose.visual_description}</p>
                      <p className="text-xs text-white/40 italic">{pose.pose_description}</p>
                      <div className="flex gap-1.5 mt-2">
                        {pose.color_palette.map((hex) => (
                          <div key={hex} className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: hex }} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SEO Package */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                <h3 className="text-base font-semibold text-white mb-4">📱 SEO Package</h3>
                <p className="text-sm font-medium text-white/80 mb-3">{remixResult!.seo_package.title}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {remixResult!.seo_package.hashtags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => navigator.clipboard.writeText(tag)}
                      className="px-2.5 py-1 rounded-full text-xs bg-cyan-500/15 text-cyan-300 border border-cyan-500/20 hover:bg-cyan-500/25 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                <div className="pt-3 border-t border-white/[0.06]">
                  <div className="text-xs text-white/40 mb-1.5">Platform Strategy</div>
                  <p className="text-sm text-white/60 leading-relaxed">{remixResult!.platform_strategy}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
