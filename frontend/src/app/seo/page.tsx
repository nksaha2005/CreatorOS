'use client';
import { useState } from 'react';
import { Copy, Check, Clock, RefreshCw } from 'lucide-react';

const PLATFORMS = ['Instagram', 'YouTube', 'TikTok', 'LinkedIn'];

const PLATFORM_DATA: Record<string, { caption: string; hashtags: string[]; keywords: string[]; times: string[] }> = {
  Instagram: {
    caption: `What if 6am on a Saturday used to feel like Christmas morning? 🌅

Before smartphones, before Netflix, before infinite scroll — there was something pure about Saturday morning cartoons. Tom & Jerry. Pokémon. SpongeBob. These weren't just shows. They were our entire childhood identity.

Now kids have everything on demand... but do they have that ANTICIPATION? That waiting all week just to catch your favorite episode?

Drop your favorite below 👇 Let's bring the nostalgia back together.`,
    hashtags: ['#NostalgiaContent', '#90sKid', '#SaturdayMorningCartoons', '#ChildhoodMemories', '#ContentCreator', '#Throwback', '#Nostalgia90s', '#CartoonNetwork', '#VibrantContent', '#Aesthetic'],
    keywords: ['nostalgia content', '90s cartoons', 'childhood memories', 'Saturday morning TV'],
    times: ['Saturday 8:00 AM EST', 'Friday 7:00 PM EST', 'Sunday 10:00 AM EST'],
  },
  YouTube: {
    caption: `I went back to watch Saturday morning cartoons... and I completely lost it.

Remember when waking up at 6AM felt like a gift? Before streaming, before phones, before Netflix — there was a golden era that defined millions of childhoods. In this video, I'm going DEEP on why Saturday morning cartoons created a generation of passionate creators.

What was your favorite show? Comment below — the most nostalgic answer wins a shoutout in my next video.

Timestamps:
0:00 — The Hook
0:10 — Why 6AM felt magical
0:30 — The shows that defined us
1:00 — What modern kids are missing
1:25 — Your turn`,
    hashtags: ['#Nostalgia', '#90sCartoons', '#SaturdayMorning', '#Childhood', '#YouTubeCreators', '#ContentCreation', '#Throwback', '#90sKid', '#Memories', '#Viral'],
    keywords: ['nostalgia youtube', '90s cartoons video', 'childhood memories channel', 'saturday morning cartoons history'],
    times: ['Friday 3:00 PM EST', 'Saturday 11:00 AM EST', 'Monday 6:00 PM EST'],
  },
  TikTok: {
    caption: `POV: It's 6AM on a Saturday in 2001 🕕

Tom & Jerry. Pokémon. SpongeBob.

No Netflix. No on-demand. Just pure anticipation.

Do you miss this? 👇

#SaturdayMorning #Nostalgia #90sKid #Childhood #90sCartoons #FYP #ForYou #Viral`,
    hashtags: ['#SaturdayMorning', '#Nostalgia', '#90sKid', '#Childhood', '#90sCartoons', '#FYP', '#ForYou', '#Viral', '#Throwback', '#CartoonNetwork'],
    keywords: ['tiktok nostalgia', '90s trend', 'childhood tiktok', 'saturday morning'],
    times: ['Tuesday 7:00 PM EST', 'Thursday 9:00 PM EST', 'Saturday 1:00 PM EST'],
  },
  LinkedIn: {
    caption: `What Saturday morning cartoons taught me about audience retention.

Before Netflix and infinite scroll, kids would wake up at 6AM every Saturday just for 2 hours of content they already knew was coming.

The secret? Manufactured anticipation, predictable value delivery, and community ritual.

Modern content creators can learn a lot from this model:
• Release on consistent schedules
• Build ritual around your content
• Leave your audience wanting more (not overwhelmed)

What content ritual have you built around your brand?`,
    hashtags: ['#ContentStrategy', '#CreatorEconomy', '#ContentMarketing', '#Nostalgia', '#Storytelling', '#DigitalMarketing', '#LinkedIn', '#B2BContent', '#CreativeBrief', '#Marketing'],
    keywords: ['content strategy linkedin', 'creator economy', 'content marketing tips', 'storytelling business'],
    times: ['Tuesday 8:00 AM EST', 'Wednesday 12:00 PM EST', 'Thursday 7:00 AM EST'],
  },
};

export default function SEOPage() {
  const [platform, setPlatform] = useState('Instagram');
  const [caption, setCaption] = useState(PLATFORM_DATA['Instagram'].caption);
  const [copiedTag, setCopiedTag] = useState<string | null>(null);
  const [copiedCaption, setCopiedCaption] = useState(false);

  const data = PLATFORM_DATA[platform];
  const charLimit = platform === 'Instagram' ? 2200 : platform === 'TikTok' ? 2200 : platform === 'YouTube' ? 5000 : 3000;

  const handlePlatformChange = (p: string) => {
    setPlatform(p);
    setCaption(PLATFORM_DATA[p].caption);
  };

  const copyTag = (tag: string) => {
    navigator.clipboard.writeText(tag);
    setCopiedTag(tag);
    setTimeout(() => setCopiedTag(null), 1200);
  };

  const copyCaption = () => {
    navigator.clipboard.writeText(caption);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 1500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 relative">
      <div className="absolute top-0 right-1/3 w-80 h-80 bg-cyan-900/10 rounded-full blur-3xl pointer-events-none" />

      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Caption & SEO Assistant #️⃣</h1>
        <p className="text-white/50 text-sm">Platform-optimized captions, hashtags, and publishing strategy.</p>
      </div>

      {/* Platform tabs */}
      <div className="flex bg-white/[0.04] border border-white/10 rounded-xl p-1 gap-1 max-w-lg">
        {PLATFORMS.map((p) => (
          <button
            key={p}
            onClick={() => handlePlatformChange(p)}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              platform === p
                ? 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-lg'
                : 'text-white/50 hover:text-white/80'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Caption Editor */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-white">{platform} Caption</h3>
              <div className="flex gap-2">
                <button onClick={copyCaption} className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 bg-white/[0.04] border border-white/10 px-3 py-1.5 rounded-lg transition-all">
                  {copiedCaption ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                  {copiedCaption ? 'Copied!' : 'Copy'}
                </button>
                <button className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 bg-violet-600/20 border border-violet-500/20 px-3 py-1.5 rounded-lg transition-all">
                  <RefreshCw size={12} /> Regenerate
                </button>
              </div>
            </div>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full min-h-56 bg-transparent text-white/80 text-sm resize-none focus:outline-none leading-relaxed placeholder:text-white/25"
            />
            <div className="flex justify-between pt-3 border-t border-white/[0.06] mt-3">
              <span className="text-xs text-white/30">{caption.length} characters</span>
              <span className={`text-xs ${caption.length > charLimit ? 'text-red-400' : 'text-white/30'}`}>
                {charLimit} limit for {platform}
              </span>
            </div>
          </div>

          {/* Hashtags */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white/80">Hashtags</h3>
              <button
                onClick={() => { navigator.clipboard.writeText(data.hashtags.join(' ')); }}
                className="text-xs text-white/40 hover:text-white/70 flex items-center gap-1 transition-colors"
              >
                <Copy size={11} /> Copy all
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.hashtags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => copyTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    copiedTag === tag
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-violet-500/15 text-violet-300 border border-violet-500/20 hover:bg-violet-500/25'
                  }`}
                >
                  {copiedTag === tag ? '✓ Copied!' : tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Keywords */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white/80 mb-3">SEO Keywords</h3>
            <div className="space-y-2">
              {data.keywords.map((kw) => (
                <div key={kw} className="flex items-center gap-2 px-3 py-2 bg-white/[0.03] rounded-lg text-xs text-white/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
                  {kw}
                </div>
              ))}
            </div>
          </div>

          {/* Best Times */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white/80 mb-3">Best Posting Times</h3>
            <div className="space-y-2">
              {data.times.map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    i === 0 ? 'bg-green-500/20 text-green-400' : 'bg-white/[0.06] text-white/40'
                  }`}>
                    {i + 1}
                  </div>
                  <Clock size={12} className="text-cyan-400 flex-shrink-0" />
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Character guide */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white/80 mb-3">Platform Limits</h3>
            {Object.entries({ Instagram: 2200, YouTube: 5000, TikTok: 2200, LinkedIn: 3000 }).map(([p, limit]) => (
              <div key={p} className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/40">{p}</span>
                  <span className="text-white/30">{limit.toLocaleString()} chars</span>
                </div>
                <div className="h-1 bg-white/[0.06] rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
