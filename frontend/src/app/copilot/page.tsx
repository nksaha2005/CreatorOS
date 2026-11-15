'use client';
import { useState, useRef, useEffect } from 'react';
import { PhaseOverlay } from '@/components/ui/PhaseOverlay';
import { useDNA } from '@/context/DNAContext';
import { chatWithAI } from '@/lib/api';
import { Send, Sparkles } from 'lucide-react';
import type { Message } from '@/lib/types';

const SAMPLE_MESSAGES: Message[] = [
  { role: 'user', content: 'Hey! I want to grow my Instagram from 0 to 10k this month. Where do I start?' },
  {
    role: 'assistant',
    content: "Love the ambition! Here's your 30-day roadmap:\n\n1. **Post daily Reels** — the algorithm rewards consistency. Even 15-second clips count.\n2. **Use 5-10 niche hashtags** (not generic ones like #love) — this gets you in front of the RIGHT audience.\n3. **Hook in the first 2 seconds** — if they scroll past, the algorithm buries you.\n\nWhat's your niche? I'll give you a personalized content calendar. 🎯",
  },
  { role: 'user', content: 'I am a Lifestyle creator focused on morning routines and productivity.' },
];

const SUGGESTIONS = [
  'Help me write a viral hook',
  'Optimize my hashtag strategy',
  'Plan my content this week',
  'What trending formats should I try?',
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-2xl rounded-tl-sm max-w-fit">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.9s' }}
        />
      ))}
    </div>
  );
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-xs mr-2.5 mt-auto flex-shrink-0">
          <Sparkles size={13} className="text-white" />
        </div>
      )}
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? 'bg-violet-600 text-white rounded-tr-sm'
            : 'bg-white/[0.05] border border-white/10 text-white/85 rounded-tl-sm'
        }`}
        style={{ whiteSpace: 'pre-wrap' }}
      >
        {msg.content}
      </div>
      {isUser && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-xs ml-2.5 mt-auto font-bold text-white flex-shrink-0">
          CR
        </div>
      )}
    </div>
  );
}

export default function CopilotPage() {
  const { dna } = useDNA();
  const [messages, setMessages] = useState<Message[]>(SAMPLE_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput('');
    const newHistory = [...messages, { role: 'user' as const, content: msg }];
    setMessages(newHistory);
    setIsTyping(true);

    try {
      const res = await chatWithAI(msg, newHistory, dna);
      setMessages((prev) => [...prev, { role: 'assistant', content: res.reply }]);
    } catch {
      await new Promise((r) => setTimeout(r, 1200));
      const responses = [
        "Great question! For your niche, I'd recommend the 'Before & After' format — show chaotic setup vs polished creative payoff. That contrast creates instant emotional engagement and is perfect for Reels under 30 seconds. 🌅",
        "Here's your next content angle: **'The 1 secret most creators hide about their workflow'** — this performs well because it creates a curiosity gap. Frame it through your Creative DNA style for maximum authenticity! 📱",
        "For high retention hooks, try starting mid-action: 'I didn't think this would work, but...' — the mystery gap keeps viewers watching past the first 2 seconds, which triggers the algorithm. 🚀",
      ];
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: responses[Math.floor(Math.random() * responses.length)] },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto relative" style={{ height: 'calc(100vh - 128px)' }}>
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-violet-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mb-4">
        <h1 className="text-3xl font-bold text-white mb-1">AI Co-Pilot 🤖</h1>
        <p className="text-white/50 text-sm">Your always-on creative strategist. Ask anything about content, growth, or creative direction.</p>
      </div>

      <div className="relative bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden" style={{ height: 'calc(100% - 70px)' }}>
        <PhaseOverlay />

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6" style={{ height: 'calc(100% - 136px)' }}>
          {messages.map((msg, i) => (
            <MessageBubble key={i} msg={msg} />
          ))}
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-xs mr-2.5 mt-auto flex-shrink-0">
                <Sparkles size={13} className="text-white" />
              </div>
              <TypingIndicator />
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        <div className="px-4 pb-2 flex gap-2 overflow-x-auto">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => handleSend(s)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs bg-white/[0.04] border border-white/10 text-white/50 hover:text-white/80 hover:border-white/20 hover:bg-white/[0.07] transition-all"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input bar */}
        <div className="p-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-3 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 focus-within:border-violet-500/40 transition-all">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="Ask your AI co-pilot anything..."
              className="flex-1 bg-transparent text-white placeholder:text-white/25 text-sm focus:outline-none"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="w-8 h-8 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            >
              <Send size={14} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
