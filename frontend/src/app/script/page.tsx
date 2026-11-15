'use client';
import { useState } from 'react';
import { Copy, Check, Download, Camera, Clock } from 'lucide-react';

const SAMPLE_SCRIPT = [
  { scene_number: 1, title: 'The Hook', description: 'Open with a CRT TV showing static.', dialogue: 'What if I told you that 6am on a Saturday used to feel like Christmas morning?', camera_angle: 'POV looking at old CRT TV', duration_seconds: 10 },
  { scene_number: 2, title: 'The Setup', description: 'Warm kitchen scene, cereal bowl in hand.', dialogue: "Before smartphones, before Netflix, before everything — there was something magical about Saturday morning cartoons.", camera_angle: 'Medium shot, warm golden light', duration_seconds: 20 },
  { scene_number: 3, title: 'Deep Dive', description: 'Montage of cartoon memories.', dialogue: "Tom and Jerry, Pokémon, SpongeBob — these weren't just shows. They were our entire childhood identity.", camera_angle: 'Quick nostalgic montage cuts', duration_seconds: 30 },
  { scene_number: 4, title: 'Modern Comparison', description: 'Split screen: old TV vs phone.', dialogue: 'Now kids have everything on demand. But do they have the ANTICIPATION?', camera_angle: 'Split screen static', duration_seconds: 25 },
  { scene_number: 5, title: 'CTA', description: 'Direct address to camera.', dialogue: "Drop your favorite Saturday morning cartoon below. Let's bring the nostalgia back together.", camera_angle: 'Direct camera address, tight close-up', duration_seconds: 15 },
];

const SAMPLE_STORYBOARD = [
  { scene_number: 1, visual_description: 'CRT TV close-up, static fuzzing in and out, warm lamplight glow', pose_description: 'Creator standing behind TV, peeking around the corner with wide eyes', color_palette: ['#FF6B35', '#FFE66D', '#1A1A2E'], mood: 'Nostalgic' },
  { scene_number: 2, visual_description: 'Cozy kitchen, morning light, cereal box in background', pose_description: 'Seated cross-legged on floor, bowl in hands, looking up dreamily', color_palette: ['#FFD93D', '#FF6B6B', '#6BCB77'], mood: 'Warm & Fuzzy' },
  { scene_number: 3, visual_description: 'Full-body shot with animated energy, arms wide open', pose_description: 'Standing, arms outstretched, big grin, slight head tilt', color_palette: ['#4ECDC4', '#FF6B35', '#1A1A2E'], mood: 'Energetic' },
  { scene_number: 4, visual_description: 'Static side-by-side: left=old TV, right=phone in hand', pose_description: 'Neutral face looking between both screens, slight shoulder shrug', color_palette: ['#7C83FD', '#96FEFF', '#07080F'], mood: 'Contemplative' },
  { scene_number: 5, visual_description: 'Tight close-up, direct eye contact, genuine smile', pose_description: 'Leaning forward slightly, hands clasped, authentic expression', color_palette: ['#FF6B35', '#FFE66D', '#FFFFFF'], mood: 'Warm & Inviting' },
];

function StickFigure() {
  return (
    <svg viewBox="0 0 60 80" className="w-14 h-14 mx-auto opacity-30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <circle cx="30" cy="12" r="10" />
      <line x1="30" y1="22" x2="30" y2="52" />
      <line x1="30" y1="30" x2="12" y2="42" />
      <line x1="30" y1="30" x2="48" y2="42" />
      <line x1="30" y1="52" x2="16" y2="72" />
      <line x1="30" y1="52" x2="44" y2="72" />
    </svg>
  );
}

export default function ScriptPage() {
  const [selectedScene, setSelectedScene] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopyScript = () => {
    const text = SAMPLE_SCRIPT.map((s) => `Scene ${s.scene_number}: ${s.title}\n${s.dialogue}`).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scene = SAMPLE_SCRIPT[selectedScene];
  const board = SAMPLE_STORYBOARD[selectedScene];

  return (
    <div className="max-w-7xl mx-auto space-y-6 relative">
      <div className="absolute top-0 left-0 w-72 h-72 bg-violet-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Script Studio 📝</h1>
          <p className="text-white/50 text-sm">Scene-by-scene script editor with visual storyboard preview.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleCopyScript} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-sm text-white/70 hover:text-white hover:border-white/20 transition-all">
            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
            {copied ? 'Copied!' : 'Copy Script'}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-sm text-white/70 hover:text-white hover:border-white/20 transition-all">
            <Download size={14} /> Export PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 min-h-[calc(100vh-220px)]">
        {/* Scene List */}
        <div className="col-span-1 xl:col-span-3 bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white/70">Scenes</h3>
            <span className="text-xs text-violet-400 font-medium">{SAMPLE_SCRIPT.length} total</span>
          </div>
          <div className="flex-1 overflow-x-auto xl:overflow-y-auto p-2 flex xl:flex-col gap-1.5">
            {SAMPLE_SCRIPT.map((s, i) => (
              <button
                key={s.scene_number}
                onClick={() => setSelectedScene(i)}
                className={`text-left px-3.5 py-3 rounded-xl transition-all duration-200 flex-shrink-0 min-w-[160px] xl:min-w-0 ${
                  selectedScene === i
                    ? 'bg-violet-500/15 border border-violet-500/30 shadow-lg shadow-violet-500/10'
                    : 'hover:bg-white/[0.03] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${selectedScene === i ? 'bg-violet-500 text-white' : 'bg-white/[0.08] text-white/50'}`}>
                    {s.scene_number}
                  </span>
                  <span className={`text-sm font-medium truncate ${selectedScene === i ? 'text-white' : 'text-white/60'}`}>{s.title}</span>
                </div>
                <div className="flex items-center gap-2 pl-7">
                  <span className="text-xs text-white/30 flex items-center gap-1"><Clock size={9} /> {s.duration_seconds}s</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Script Editor */}
        <div className="col-span-1 xl:col-span-5 bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden flex flex-col">
          <div className="p-5 border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex items-center justify-center flex-shrink-0">
                {scene.scene_number}
              </span>
              <h3 className="font-semibold text-white">{scene.title}</h3>
            </div>
            <div className="flex items-center flex-wrap gap-2">
              <span className="text-xs bg-white/[0.06] text-white/70 px-2.5 py-1 rounded-full flex items-center gap-1.5 whitespace-nowrap">
                <Camera size={11} className="text-violet-400" /> {scene.camera_angle}
              </span>
              <span className="text-xs bg-cyan-500/15 text-cyan-400 font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">{scene.duration_seconds}s</span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            <div>
              <div className="text-xs text-white/40 uppercase tracking-widest mb-2 font-medium">Scene Description</div>
              <p className="text-sm text-white/70 leading-relaxed">{scene.description}</p>
            </div>
            <div>
              <div className="text-xs text-white/40 uppercase tracking-widest mb-2 font-medium">Dialogue / Script</div>
              <div className="bg-black/30 border border-white/[0.08] rounded-xl p-5 font-mono text-sm text-white/90 leading-relaxed italic">
                &ldquo;{scene.dialogue}&rdquo;
              </div>
            </div>
            <div>
              <div className="text-xs text-white/40 uppercase tracking-widest mb-2 font-medium">Camera Direction</div>
              <div className="flex items-center gap-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3">
                <Camera size={16} className="text-violet-400 flex-shrink-0" />
                <span className="text-sm text-white/80">{scene.camera_angle}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Storyboard Preview */}
        <div className="col-span-1 xl:col-span-4 bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-white/[0.06]">
            <h3 className="text-sm font-semibold text-white/70">Storyboard Preview</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* Pose sketch */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 text-center">
              <div className="text-white/20 mb-2">
                <StickFigure />
              </div>
              <p className="text-xs text-white/40 italic">{board.pose_description}</p>
            </div>

            <div>
              <div className="text-xs text-white/40 uppercase tracking-widest mb-2">Visual Description</div>
              <p className="text-sm text-white/70 leading-relaxed">{board.visual_description}</p>
            </div>

            <div>
              <div className="text-xs text-white/40 uppercase tracking-widest mb-2">Color Palette</div>
              <div className="flex gap-2">
                {board.color_palette.map((hex) => (
                  <div key={hex} className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-lg border border-white/20 shadow-lg" style={{ backgroundColor: hex }} />
                    <span className="text-[9px] text-white/30">{hex}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs text-white/40 uppercase tracking-widest mb-2">Scene Mood</div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-violet-500/15 text-violet-300 border border-violet-500/20">
                {board.mood}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
