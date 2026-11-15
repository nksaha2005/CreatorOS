'use client';
import { usePhase } from '@/context/PhaseContext';
import { Bell } from 'lucide-react';

export function Header() {
  const { phase, setPhase } = usePhase();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/[0.06] bg-[#07080F]/95 backdrop-blur-xl flex items-center justify-between px-6">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <span className="text-2xl">🎬</span>
        <div>
          <span className="font-bold text-xl bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Creator OS
          </span>
          <div className="text-[10px] text-white/30 leading-none tracking-widest uppercase">AI Creative Studio</div>
        </div>
      </div>

      {/* Phase Switcher */}
      <div className="flex items-center bg-white/[0.04] border border-white/10 rounded-full p-1 gap-1">
        <button
          onClick={() => setPhase('mvp')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
            phase === 'mvp'
              ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25'
              : 'text-white/40 hover:text-white/70'
          }`}
        >
          🛠️ Phase 1: 50% MVP
        </button>
        <button
          onClick={() => setPhase('final')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
            phase === 'final'
              ? 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-lg shadow-cyan-500/25'
              : 'text-white/40 hover:text-white/70'
          }`}
        >
          🚀 Phase 2: Final Build
        </button>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white/[0.04] border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all duration-200">
          <Bell size={16} />
        </button>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
          CR
        </div>
      </div>
    </header>
  );
}
