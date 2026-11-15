'use client';
import { Bell } from 'lucide-react';

export function Header() {
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

      {/* Center Status Badge */}
      <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 shadow-inner">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs font-medium text-white/70">
          Creative Engine <span className="text-violet-400 font-semibold">Live</span> · Gemini 4 Hydrogen
        </span>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white/[0.04] border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all duration-200">
          <Bell size={16} />
        </button>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-violet-500/20">
          CR
        </div>
      </div>
    </header>
  );
}
