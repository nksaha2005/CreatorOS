'use client';
import React, { createContext, useContext, useState } from 'react';

export type Phase = 'mvp' | 'final';

interface PhaseContextType {
  phase: Phase;
  setPhase: (p: Phase) => void;
}

const PhaseContext = createContext<PhaseContextType>({
  phase: 'mvp',
  setPhase: () => {},
});

export function PhaseProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>('mvp');
  return (
    <PhaseContext.Provider value={{ phase, setPhase }}>
      {children}
    </PhaseContext.Provider>
  );
}

export const usePhase = () => useContext(PhaseContext);
