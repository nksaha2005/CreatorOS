'use client';
import { useState } from 'react';
import { useDNA } from '@/context/DNAContext';
import type { CreativeDNA } from '@/lib/types';
import { Save, CheckCircle } from 'lucide-react';

const NICHES = ['Lifestyle', 'Tech', 'Gaming', 'Beauty', 'Fitness', 'Food', 'Travel', 'Education'];
const STYLES = ['Cinematic', 'Vlog', 'Aesthetic', 'Raw/Real', 'Animated'];
const TONES = ['Inspiring', 'Humorous', 'Educational', 'Controversial', 'Emotional'];
const AUDIENCES = ['Gen Z', 'Millennials', 'Gen X', 'B2B Professionals', 'Parents'];
const PLATFORMS = ['Instagram', 'YouTube', 'TikTok', 'LinkedIn', 'Twitter'];

const PLATFORM_ICONS: Record<string, string> = {
  Instagram: '📸',
  YouTube: '▶️',
  TikTok: '🎵',
  LinkedIn: '💼',
  Twitter: '🐦',
};

export default function DNAPage() {
  const { dna, setDna } = useDNA();
  const [local, setLocal] = useState<CreativeDNA>({ ...dna });
  const [saved, setSaved] = useState(false);

  const togglePlatform = (p: string) => {
    setLocal((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(p)
        ? prev.platforms.filter((x) => x !== p)
        : [...prev.platforms, p],
    }));
  };

  const handleSave = () => {
    setDna(local);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const dnaStrength = Math.round(
    ((local.niche ? 20 : 0) +
      (local.style ? 20 : 0) +
      (local.tone ? 20 : 0) +
      (local.audience ? 20 : 0) +
      (local.platforms.length > 0 ? 20 : 0)) *
      0.85
  );

  const selectClass =
    'w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.06] transition-all duration-200';

  return (
    <div className="max-w-6xl mx-auto space-y-8 relative">
      {/* Ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-900/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Creative DNA <span className="text-2xl">🧬</span>
        </h1>
        <p className="text-white/50">Define your creative identity. Every AI output will be personalized to your unique fingerprint.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Form — 3 cols */}
        <div className="md:col-span-3 space-y-5">
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-5">
            <h2 className="text-base font-semibold text-white/80 pb-3 border-b border-white/[0.06]">Your Creative Profile</h2>

            <div>
              <label className="text-sm text-white/50 mb-2 block">Content Niche</label>
              <select className={selectClass} value={local.niche} onChange={(e) => setLocal({ ...local, niche: e.target.value })}>
                {NICHES.map((n) => <option key={n} value={n} className="bg-[#07080F]">{n}</option>)}
              </select>
            </div>

            <div>
              <label className="text-sm text-white/50 mb-2 block">Visual Style</label>
              <select className={selectClass} value={local.style} onChange={(e) => setLocal({ ...local, style: e.target.value })}>
                {STYLES.map((s) => <option key={s} value={s} className="bg-[#07080F]">{s}</option>)}
              </select>
            </div>

            <div>
              <label className="text-sm text-white/50 mb-2 block">Content Tone</label>
              <select className={selectClass} value={local.tone} onChange={(e) => setLocal({ ...local, tone: e.target.value })}>
                {TONES.map((t) => <option key={t} value={t} className="bg-[#07080F]">{t}</option>)}
              </select>
            </div>

            <div>
              <label className="text-sm text-white/50 mb-2 block">Target Audience</label>
              <select className={selectClass} value={local.audience} onChange={(e) => setLocal({ ...local, audience: e.target.value })}>
                {AUDIENCES.map((a) => <option key={a} value={a} className="bg-[#07080F]">{a}</option>)}
              </select>
            </div>

            <div>
              <label className="text-sm text-white/50 mb-2 block">Publishing Platforms</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {PLATFORMS.map((p) => {
                  const active = local.platforms.includes(p);
                  return (
                    <button
                      key={p}
                      onClick={() => togglePlatform(p)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                        active
                          ? 'bg-violet-600/30 border border-violet-500/50 text-violet-300'
                          : 'bg-white/[0.04] border border-white/10 text-white/50 hover:text-white/80 hover:border-white/20'
                      }`}
                    >
                      <span>{PLATFORM_ICONS[p]}</span>
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleSave}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white font-semibold text-sm hover:from-violet-500 hover:to-violet-400 transition-all duration-200 hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 mt-2"
            >
              {saved ? (
                <><CheckCircle size={16} /> DNA Saved!</>
              ) : (
                <><Save size={16} /> Save My Creative DNA</>
              )}
            </button>
          </div>
        </div>

        {/* Preview — 2 cols */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white/[0.03] border border-violet-500/20 rounded-2xl p-6">
            <h3 className="text-base font-semibold text-white mb-4">Your Creative Fingerprint</h3>
            <div className="space-y-3">
              {[
                { label: 'Niche', value: local.niche },
                { label: 'Style', value: local.style },
                { label: 'Tone', value: local.tone },
                { label: 'Audience', value: local.audience },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-xs text-white/40">{label}</span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-violet-500/15 text-violet-300 border border-violet-500/20">
                    {value}
                  </span>
                </div>
              ))}
              {local.platforms.length > 0 && (
                <div>
                  <span className="text-xs text-white/40 block mb-2">Platforms</span>
                  <div className="flex flex-wrap gap-1.5">
                    {local.platforms.map((p) => (
                      <span key={p} className="px-2 py-0.5 rounded-full text-xs bg-cyan-500/15 text-cyan-300 border border-cyan-500/20">
                        {PLATFORM_ICONS[p]} {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* DNA Strength */}
            <div className="mt-5 pt-4 border-t border-white/[0.06]">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-white/50">DNA Strength</span>
                <span className="text-violet-400 font-semibold">{dnaStrength}%</span>
              </div>
              <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full transition-all duration-500"
                  style={{ width: `${dnaStrength}%` }}
                />
              </div>
              <p className="text-xs text-white/30 mt-2">
                {dnaStrength >= 80 ? '🌟 Strong creative identity defined!' : 'Complete all fields for maximum personalization'}
              </p>
            </div>
          </div>

          {/* AI Preview */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
            <h4 className="text-sm font-semibold text-white/70 mb-3">AI will personalize for:</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li className="flex items-center gap-2"><CheckCircle size={13} className="text-green-400 flex-shrink-0" /> Script tone and vocabulary</li>
              <li className="flex items-center gap-2"><CheckCircle size={13} className="text-green-400 flex-shrink-0" /> Visual style and color palettes</li>
              <li className="flex items-center gap-2"><CheckCircle size={13} className="text-green-400 flex-shrink-0" /> Platform-specific SEO tags</li>
              <li className="flex items-center gap-2"><CheckCircle size={13} className="text-green-400 flex-shrink-0" /> Optimal posting schedules</li>
              <li className="flex items-center gap-2"><CheckCircle size={13} className="text-green-400 flex-shrink-0" /> Camera angles and poses</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
