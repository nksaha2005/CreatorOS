'use client';
import { PhaseOverlay } from '@/components/ui/PhaseOverlay';

const COLUMNS = [
  { name: 'Ideas', color: 'bg-white/[0.04]', border: 'border-white/10', count: 3 },
  { name: 'Scripting', color: 'bg-violet-500/[0.04]', border: 'border-violet-500/20', count: 2 },
  { name: 'Filming', color: 'bg-yellow-500/[0.04]', border: 'border-yellow-500/20', count: 1 },
  { name: 'Editing', color: 'bg-orange-500/[0.04]', border: 'border-orange-500/20', count: 2 },
  { name: 'Scheduled', color: 'bg-cyan-500/[0.04]', border: 'border-cyan-500/20', count: 1 },
  { name: 'Published', color: 'bg-green-500/[0.04]', border: 'border-green-500/20', count: 4 },
];

const CARDS: Record<string, Array<{ title: string; type: string; color: string }>> = {
  Ideas: [
    { title: 'Morning Motivation Routine', type: 'Lifestyle', color: 'bg-violet-500/15 text-violet-300' },
    { title: 'iPhone 16 Camera Deep Dive', type: 'Tech', color: 'bg-cyan-500/15 text-cyan-300' },
    { title: 'Street Food World Tour Ep.5', type: 'Food', color: 'bg-orange-500/15 text-orange-300' },
  ],
  Scripting: [
    { title: '90s Nostalgia Childhood Reel', type: 'Lifestyle', color: 'bg-violet-500/15 text-violet-300' },
    { title: 'Gym Transformation Month 3', type: 'Fitness', color: 'bg-red-500/15 text-red-300' },
  ],
  Filming: [
    { title: 'ASMR Study Session Vol.4', type: 'Education', color: 'bg-blue-500/15 text-blue-300' },
  ],
  Editing: [
    { title: 'Room Makeover Budget Challenge', type: 'Design', color: 'bg-teal-500/15 text-teal-300' },
    { title: 'Travel Vlog: Tokyo Day 2', type: 'Travel', color: 'bg-yellow-500/15 text-yellow-300' },
  ],
  Scheduled: [
    { title: 'Morning Affirmations Reel', type: 'Lifestyle', color: 'bg-violet-500/15 text-violet-300' },
  ],
  Published: [
    { title: 'Productivity Secrets Video', type: 'Lifestyle', color: 'bg-violet-500/15 text-violet-300' },
    { title: 'Camera Comparison 2026', type: 'Tech', color: 'bg-cyan-500/15 text-cyan-300' },
    { title: 'Morning Routine Vlog', type: 'Lifestyle', color: 'bg-violet-500/15 text-violet-300' },
    { title: 'TikTok Growth Strategy', type: 'Education', color: 'bg-blue-500/15 text-blue-300' },
  ],
};

export default function PlannerPage() {
  return (
    <div className="max-w-full space-y-6 relative">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl pointer-events-none" />

      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Content Planner 📅</h1>
        <p className="text-white/50 text-sm">Visualize and manage your entire content pipeline in one place.</p>
      </div>

      <div className="relative">
        <PhaseOverlay />

        {/* Kanban Board */}
        <div className="flex gap-4 overflow-x-auto pb-4">
          {COLUMNS.map((col) => (
            <div key={col.name} className="flex-shrink-0 w-56">
              <div className={`border ${col.border} rounded-xl overflow-hidden`}>
                <div className={`${col.color} border-b ${col.border} px-4 py-3 flex items-center justify-between`}>
                  <span className="text-sm font-semibold text-white/80">{col.name}</span>
                  <span className="w-5 h-5 rounded-full bg-white/[0.08] text-white/50 text-xs flex items-center justify-center font-medium">
                    {col.count}
                  </span>
                </div>
                <div className={`${col.color} p-2 space-y-2 min-h-48`}>
                  {(CARDS[col.name] || []).map((card, i) => (
                    <div
                      key={i}
                      className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-3 cursor-pointer hover:border-white/20 transition-all hover:-translate-y-0.5"
                    >
                      {/* Thumbnail placeholder */}
                      <div className="w-full h-24 bg-gradient-to-br from-white/[0.03] to-white/[0.06] rounded-lg mb-2 flex items-center justify-center border border-white/[0.06]">
                        <span className="text-2xl opacity-30">🎬</span>
                      </div>
                      <p className="text-xs font-medium text-white/80 leading-tight mb-1.5">{card.title}</p>
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${card.color}`}>
                        {card.type}
                      </span>
                    </div>
                  ))}
                  {/* Add card placeholder */}
                  <button className="w-full py-2 rounded-xl border border-dashed border-white/[0.08] text-white/20 text-xs hover:border-white/20 hover:text-white/40 transition-all">
                    + Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
