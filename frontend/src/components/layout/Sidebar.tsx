'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Fingerprint,
  Sparkles,
  FileText,
  Hash,
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard', badge: null },
  { href: '/dna', icon: Fingerprint, label: 'Creative DNA', badge: null },
  { href: '/studio', icon: Sparkles, label: 'AI Studio', badge: 'HOT' },
  { href: '/script', icon: FileText, label: 'Script Studio', badge: null },
  { href: '/seo', icon: Hash, label: 'Caption & SEO', badge: null },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 border-r border-white/[0.06] bg-[#07080F]/95 backdrop-blur-xl overflow-y-auto flex flex-col">
      <nav className="px-3 py-6 space-y-1 flex-1">
        <div className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-white/30">
          Core Studio
        </div>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 relative ${
                isActive
                  ? 'bg-violet-500/10 text-violet-300 border-l-2 border-violet-500 pl-[12px] ml-[-2px] shadow-sm shadow-violet-500/10'
                  : 'text-white/50 hover:text-white/80 hover:bg-white/[0.03] border-l-2 border-transparent ml-[-2px]'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-violet-400' : 'group-hover:text-white/70'} />
              <span className="text-sm font-medium flex-1 truncate">{item.label}</span>
              {item.badge && (
                <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white leading-none shadow-sm">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom model branding badge */}
      <div className="px-3 pb-6">
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 shadow-inner">
          <div className="text-[10px] text-white/30 mb-1 uppercase tracking-widest font-medium">Powered by</div>
          <div className="text-sm font-semibold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Gemini 4 Hydrogen
          </div>
          <div className="text-[10px] text-white/40 mt-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            4-Agent Swarm Pipeline
          </div>
        </div>
      </div>
    </aside>
  );
}
