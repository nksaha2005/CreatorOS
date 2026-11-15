import { cn } from '@/lib/utils';
import React from 'react';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'violet' | 'cyan' | 'green' | 'none';
  padding?: string;
}

export function GlowCard({ children, className, glowColor = 'none', padding = 'p-6' }: GlowCardProps) {
  return (
    <div
      className={cn(
        'relative bg-white/[0.03] border border-white/10 rounded-xl transition-all duration-200 hover:border-white/20 hover:-translate-y-0.5 overflow-hidden',
        padding,
        className
      )}
    >
      {glowColor === 'violet' && (
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
      )}
      {glowColor === 'cyan' && (
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      )}
      {glowColor === 'green' && (
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
