'use client';
import { useState } from 'react';
import { usePhase } from '@/context/PhaseContext';
import { Sparkles, ArrowRight } from 'lucide-react';

export function PhaseOverlay() {
  const { phase, setPhase } = usePhase();
  const [dismissed, setDismissed] = useState(false);

  if (phase === 'final' || dismissed) return null;

  return (
    <div className="absolute inset-0 z-50 backdrop-blur-md bg-[#07080F]/80 rounded-2xl flex items-center justify-center p-6 min-h-[420px]">
      <div className="relative text-center px-8 py-10 bg-[#0d0f1a]/90 border border-violet-500/30 rounded-2xl max-w-md mx-auto shadow-2xl shadow-violet-950/50 overflow-hidden">
        {/* Ambient radial glow inside card */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-violet-600/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-cyan-600/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 mb-4 text-3xl shadow-inner">
            🚧
          </div>
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/15 text-violet-300 border border-violet-500/30 mb-3 uppercase tracking-wider">
            Phase 1: 50% MVP Checkpoint
          </div>
          <h3 className="text-white font-bold text-xl mb-1">Module Locked in MVP Mode</h3>
          <p className="text-white/40 text-xs mb-4">
            In Progress for Final Submission (100% Code Built)
          </p>
          <p className="text-white/60 text-sm mb-6 leading-relaxed">
            This module is 100% completed under the hood. Toggle the navbar to <span className="text-cyan-400 font-semibold">Phase 2: Final Build</span> or click below to preview it immediately.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
            <button
              onClick={() => setDismissed(true)}
              className="px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white/90 text-sm font-medium border border-white/10 transition-all duration-200 hover:scale-[1.02] active:scale-95"
            >
              Preview Unlocked Module
            </button>
            <button
              onClick={() => setPhase('final')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white text-sm font-semibold shadow-lg shadow-violet-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-1.5"
            >
              <Sparkles size={14} /> Switch to Phase 2
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
