'use client';
import { useState, useEffect } from 'react';
import { PhaseOverlay } from '@/components/ui/PhaseOverlay';
import { getVault, saveToVault } from '@/lib/api';
import type { VaultItem } from '@/lib/types';
import { Search, Plus, Tag, Trash2, ExternalLink, X } from 'lucide-react';

const SAMPLE_VAULT: VaultItem[] = [
  { id: '1', title: 'Morning Motivation Concept', content: '5AM routine transformation video showing before/after productivity gains with time-lapse B-roll and inspiring narration. Perfect for the Lifestyle niche.', tags: ['Lifestyle', 'Productivity'], created_at: '2026-11-14T08:00:00' },
  { id: '2', title: 'iPhone vs Android Camera Battle', content: 'Side-by-side comparison reel in golden hour lighting at iconic city locations with real people reactions. High viral potential.', tags: ['Tech', 'Review'], created_at: '2026-11-13T14:30:00' },
  { id: '3', title: 'Street Food World Tour', content: '30-second flavor explosion reels from 5 different countries featuring the same dish prepared differently. Great for Travel + Food crossover.', tags: ['Food', 'Travel'], created_at: '2026-11-12T10:00:00' },
  { id: '4', title: 'ASMR Study With Me', content: '3-hour cozy library session with rain sounds, keyboard ASMR, and aesthetic flat-lay shots of notes. Education meets lifestyle.', tags: ['Education', 'ASMR'], created_at: '2026-11-11T20:00:00' },
  { id: '5', title: 'Gym Transformation 90 Days', content: 'Weekly progress montage with nutrition breakdown overlay and motivational narration tracking real results without filters.', tags: ['Fitness', 'Motivation'], created_at: '2026-11-10T07:00:00' },
  { id: '6', title: 'Aesthetic Room Makeover on 500 Budget', content: 'Before/after satisfying room transformation using thrift store finds and DIY hacks with shopping breakdown. Budget-friendly angle.', tags: ['Lifestyle', 'Design'], created_at: '2026-11-09T16:00:00' },
];

const TAG_COLORS: Record<string, string> = {
  Lifestyle: 'bg-violet-500/15 text-violet-300 border-violet-500/20',
  Tech: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/20',
  Gaming: 'bg-green-500/15 text-green-300 border-green-500/20',
  Food: 'bg-orange-500/15 text-orange-300 border-orange-500/20',
  Travel: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/20',
  Fitness: 'bg-red-500/15 text-red-300 border-red-500/20',
  Education: 'bg-blue-500/15 text-blue-300 border-blue-500/20',
  ASMR: 'bg-pink-500/15 text-pink-300 border-pink-500/20',
  Review: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/20',
  Productivity: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20',
  Design: 'bg-teal-500/15 text-teal-300 border-teal-500/20',
  Motivation: 'bg-amber-500/15 text-amber-300 border-amber-500/20',
};

export default function VaultPage() {
  const [items, setItems] = useState<VaultItem[]>(SAMPLE_VAULT);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTag, setNewTag] = useState('Lifestyle');

  useEffect(() => {
    getVault()
      .then((data) => {
        if (data && data.length > 0) setItems(data);
      })
      .catch(() => {
        // Fallback to SAMPLE_VAULT
      });
  }, []);

  const filtered = items.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.content.toLowerCase().includes(search.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  const deleteItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  const handleAddIdea = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newItemData = {
      title: newTitle.trim(),
      content: newContent.trim(),
      tags: [newTag],
    };
    try {
      const saved = await saveToVault(newItemData);
      setItems((prev) => [saved, ...prev]);
    } catch {
      const localItem: VaultItem = {
        id: String(Date.now()),
        title: newTitle.trim(),
        content: newContent.trim(),
        tags: [newTag],
        created_at: new Date().toISOString(),
      };
      setItems((prev) => [localItem, ...prev]);
    }
    setNewTitle('');
    setNewContent('');
    setShowAddModal(false);
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 relative">
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-violet-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Idea Vault 💡</h1>
          <p className="text-white/50 text-sm">Your personal library of content ideas, concepts, and creative seeds.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white font-medium text-sm hover:from-violet-500 hover:to-violet-400 transition-all hover:scale-[1.02] shadow-lg shadow-violet-500/20"
        >
          <Plus size={16} /> Add Idea
        </button>
      </div>

      {/* Add Idea Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e101c] border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white"
            >
              <X size={18} />
            </button>
            <h2 className="text-lg font-bold text-white mb-4">Add to Idea Vault</h2>
            <form onSubmit={handleAddIdea} className="space-y-4">
              <div>
                <label className="text-xs text-white/50 block mb-1">Idea Title</label>
                <input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. 10 Things I Learned in 100 Days"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500/50"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-white/50 block mb-1">Concept Notes</label>
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Hook, visuals, key points..."
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500/50 min-h-24 resize-none"
                />
              </div>
              <div>
                <label className="text-xs text-white/50 block mb-1">Category Tag</label>
                <select
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="w-full bg-[#07080F] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500/50"
                >
                  {['Lifestyle', 'Tech', 'Gaming', 'Food', 'Travel', 'Fitness', 'Education', 'Productivity', 'Design'].map((t) => (
                    <option key={t} value={t} className="bg-[#07080F]">{t}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm text-white/50 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm transition-all"
                >
                  Save Idea
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Overlay wrapper */}
      <div className="relative">
        <PhaseOverlay />

        {/* Search */}
        <div className="relative mb-5">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ideas, tags..."
            className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-violet-500/40 transition-all"
          />
        </div>

        {/* Ideas grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="break-inside-avoid bg-white/[0.03] border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5 group"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-white/90 text-sm leading-tight">{item.title}</h3>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                  <button className="w-6 h-6 flex items-center justify-center rounded-lg bg-white/[0.06] text-white/40 hover:text-white/80 hover:bg-white/[0.1] transition-all">
                    <ExternalLink size={11} />
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="w-6 h-6 flex items-center justify-center rounded-lg bg-white/[0.06] text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all"
                  >
                    <Trash2 size={11} />
                  </button>
                </div>
              </div>
              <p className="text-xs text-white/50 leading-relaxed mb-3 line-clamp-3">{item.content}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${TAG_COLORS[tag] || 'bg-white/[0.06] text-white/50 border-white/10'}`}
                  >
                    <Tag size={8} /> {tag}
                  </span>
                ))}
              </div>
              <div className="text-[10px] text-white/25">{formatDate(item.created_at)}</div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-white/40 text-sm">No ideas match your search</p>
          </div>
        )}
      </div>
    </div>
  );
}
