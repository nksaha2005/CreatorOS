'use client';
import React, { createContext, useContext, useState } from 'react';
import type { CreativeDNA } from '@/lib/types';

interface DNAContextType {
  dna: CreativeDNA;
  setDna: (dna: CreativeDNA) => void;
}

const DEFAULT_DNA: CreativeDNA = {
  niche: 'Lifestyle',
  style: 'Cinematic',
  tone: 'Inspiring',
  audience: 'Gen Z & Millennials',
  platforms: ['Instagram', 'YouTube'],
};

const DNAContext = createContext<DNAContextType>({
  dna: DEFAULT_DNA,
  setDna: () => {},
});

export function DNAProvider({ children }: { children: React.ReactNode }) {
  const [dna, setDna] = useState<CreativeDNA>(DEFAULT_DNA);
  return (
    <DNAContext.Provider value={{ dna, setDna }}>
      {children}
    </DNAContext.Provider>
  );
}

export const useDNA = () => useContext(DNAContext);
