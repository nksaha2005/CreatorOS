'use client';
import { TrendingUp, Zap, Archive, Flame, Sparkles, BarChart2, ArrowRight, Clock, Video, FileText } from 'lucide-react';
import Link from 'next/link';

const STATS = [
  {
    label: 'Content Created',
    value: '24',
    change: '+12% this week',
    positive: true,
    icon: Video,
    color: 'violet',
  },
  {
    label: 'Viral Score Avg',
    value: '87%',
    change: '+5% this week',
    positive: true,
    icon: TrendingUp,
    color: 'cyan',
  },
  {
    label: 'Viral Hooks Crafted',
    value: '48',
    change: '12 new today',
    positive: true,
    icon: Sparkles,
    color: 'violet',
  },
  {
    label: 'Creator Streak',
    value: '7 days',
    change: 'Keep it up! 🔥',
    positive: true,
    icon: Flame,
    color: 'cyan',
  },
];

const ACTIVITY = [
  { icon: Sparkles, text: 'Generated "Morning Motivation" script', time: '2 hours ago', color: 'violet' },
  { icon: Video, text: 'Remixed viral iPhone 16 reel', time: '5 hours ago', color: 'cyan' },
  { icon: FileText, text: 'Optimized captions & SEO for "Street Food Tour"', time: 'Yesterday, 8PM', color: 'violet' },
  { icon: BarChart2, text: 'Created SEO package for 3 reels', time: 'Yesterday, 3PM', color: 'cyan' },
  { icon: Sparkles, text: 'Generated storyboard for "90s Nostalgia"', time: '2 days ago', color: 'violet' },
];

const TRENDING = [
  '#AIContent', '#ViralReels', '#ContentCreator',
  '#Aesthetic2026', '#CreatorLife', '#VlogLife',
  '#GoldenHour', '#TechTok', '#DayInMyLife',
];

export default function DashboardPage() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 relative">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-900/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-1/4 w-72 h-72 bg-cyan-900/10 rounded-full blur-3xl pointer-events-none" />

      {/* Welcome Header */}
      <div className="relative">
        <p className="text-white/40 text-sm mb-1">{today}</p>
        <h1 className="text-3xl font-bold text-white">
          Welcome back, <span className="gradient-text">Creator</span> 👋
        </h1>
        <p className="text-white/50 mt-2">Your AI creative studio is ready. What are we making today?</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white/[0.03] border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  stat.color === 'violet' ? 'bg-violet-500/15' : 'bg-cyan-500/15'
                }`}>
                  <Icon size={18} className={stat.color === 'violet' ? 'text-violet-400' : 'text-cyan-400'} />
                </div>
                <span className="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-white mb-0.5">{stat.value}</div>
              <div className="text-xs text-white/40">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/studio">
            <div className="group bg-gradient-to-br from-violet-600/20 to-violet-900/20 border border-violet-500/20 rounded-xl p-6 hover:border-violet-500/40 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
              <div className="text-3xl mb-3">✨</div>
              <h3 className="font-semibold text-white mb-1">New Idea</h3>
              <p className="text-sm text-white/50 mb-4">Turn any thought into a full content package</p>
              <div className="flex items-center gap-1 text-violet-400 text-sm font-medium group-hover:gap-2 transition-all">
                Start creating <ArrowRight size={14} />
              </div>
            </div>
          </Link>
          <Link href="/studio">
            <div className="group bg-gradient-to-br from-cyan-600/20 to-cyan-900/20 border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/40 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
              <div className="text-3xl mb-3">🎬</div>
              <h3 className="font-semibold text-white mb-1">Remix Viral</h3>
              <p className="text-sm text-white/50 mb-4">Paste a reel URL and get custom creative twists</p>
              <div className="flex items-center gap-1 text-cyan-400 text-sm font-medium group-hover:gap-2 transition-all">
                Paste URL <ArrowRight size={14} />
              </div>
            </div>
          </Link>
          <Link href="/script">
            <div className="group bg-white/[0.03] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
              <div className="text-3xl mb-3">📝</div>
              <h3 className="font-semibold text-white mb-1">Script Studio</h3>
              <p className="text-sm text-white/50 mb-4">View, edit, and export your scene-by-scene scripts</p>
              <div className="flex items-center gap-1 text-white/50 text-sm font-medium group-hover:gap-2 group-hover:text-white transition-all">
                Open studio <ArrowRight size={14} />
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="md:col-span-2 bg-white/[0.03] border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-white">Recent Activity</h2>
            <span className="text-xs text-white/30">Last 7 days</span>
          </div>
          <div className="space-y-3">
            {ACTIVITY.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-white/[0.04] last:border-0">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    item.color === 'violet' ? 'bg-violet-500/15' : 'bg-cyan-500/15'
                  }`}>
                    <Icon size={15} className={item.color === 'violet' ? 'text-violet-400' : 'text-cyan-400'} />
                  </div>
                  <span className="text-sm text-white/70 flex-1">{item.text}</span>
                  <span className="text-xs text-white/30 flex-shrink-0 flex items-center gap-1">
                    <Clock size={11} />
                    {item.time}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Trending Topics */}
        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-white">Trending Now</h2>
            <TrendingUp size={16} className="text-green-400" />
          </div>
          <div className="flex flex-wrap gap-2">
            {TRENDING.map((tag) => (
              <button
                key={tag}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/[0.05] border border-white/10 text-white/60 hover:bg-violet-500/15 hover:text-violet-300 hover:border-violet-500/30 transition-all duration-200"
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-white/[0.06]">
            <Link href="/studio" className="flex items-center justify-between text-sm text-white/40 hover:text-violet-400 transition-colors">
              <span>Use a trend in AI Studio</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
