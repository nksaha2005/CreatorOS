import type { CreativeDNA, GenerateResponse, RemixResponse, ChatResponse, VaultItem, Message } from './types';

const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function generateIdea(idea: string, dna: CreativeDNA): Promise<GenerateResponse> {
  const res = await fetch(`${BASE}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idea, dna }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function remixVideo(url: string | null, file: File | null, dna: CreativeDNA): Promise<RemixResponse> {
  const form = new FormData();
  if (file) form.append('file', file);
  if (url) form.append('url', url);
  form.append('dna', JSON.stringify(dna));
  const res = await fetch(`${BASE}/api/remix-video`, { method: 'POST', body: form });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function chatWithAI(message: string, history: Message[], dna: CreativeDNA): Promise<ChatResponse> {
  const res = await fetch(`${BASE}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history, dna }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getVault(): Promise<VaultItem[]> {
  const res = await fetch(`${BASE}/api/vault`);
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  return data.items;
}

export async function saveToVault(item: Omit<VaultItem, 'id' | 'created_at'>): Promise<VaultItem> {
  const res = await fetch(`${BASE}/api/vault`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
