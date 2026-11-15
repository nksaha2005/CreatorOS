'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePhase } from '@/context/PhaseContext';
import {
  LayoutDashboard,
  Fingerprint,
  Sparkles,
  FileText,
  Hash,
  Archive,
  Calendar,
  MessageSquare,
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard', phase2: false, badge: null },
  { href: '/dna', icon: Fingerprint, label: 'Creative DNA', phase2: false, badge: null },
  { href: '/studio', icon: Sparkles, label: 'AI Studio', phase2: false, badge: 'HOT' },
  { href: '/script', icon: FileText, label: 'Script Studio', phase2: false, badge: null },
  { href: '/seo', icon: Hash, label: 'Caption & SEO', phase2: false, badge: null },
  { href: '/vault', icon: Archive, label: 'Idea Vault', phase2: true, badge: null },
  { href: '/planner', icon: Calendar, label: 'Content Planner', phase2: true, badge: null },
  { href: '/copilot', icon: MessageSquare, label: 'AI Co-Pilot', phase2: true, badge: null },
];

export function Sidebar() {
  const pathname = usePathname();
  const { phase } = usePhase();

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 border-r border-white/[0.06] bg-[#07080F]/95 backdrop-blur-xl overflow-y-auto flex flex-col">
      <nav className="px-3 py-6 space-y-0.5 flex-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 relative ${
                isActive
                  ? 'bg-violet-500/10 text-violet-300 border-l-2 border-violet-500 pl-[10px] ml-[-2px]'
                  : 'text-white/50 hover:text-white/80 hover:bg-white/[0.03] border-l-2 border-transparent ml-[-2px]'
              }`}
            >
              <Icon size={17} className={isActive ? 'text-violet-400' : 'group-hover:text-white/70'} />
              <span className="text-sm font-medium flex-1 truncate">{item.label}</span>
              {item.badge && (
                <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white leading-none">
                  {item.badge}
                </span>
              )}
              {item.phase2 && phase === 'mvp' && (
                <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-violet-900/50 border border-violet-500/30 text-violet-400 leading-none">
                  P2
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom model badge */}
      <div className="px-3 pb-6">
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
          <div className="text-[10px] text-white/30 mb-1 uppercase tracking-widest">Powered by</div>
          <div className="text-sm font-semibold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Gemini 4 Hydrogen
          </div>
          <div className="text-[10px] text-white/25 mt-0.5">4-Agent Swarm Pipeline</div>
        </div>
      </div>
    </aside>
  );
}
