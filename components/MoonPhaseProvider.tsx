"use client"
import { type ReactNode, createContext } from 'react';

export type MoonPhase = "New Moon" | "Waxing Crescent" | "First Quarter" | "Waxing Gibbous" |
  "Full Moon" | "Waning Gibbous" | "Last Quarter" | "Waning Crescent";

export interface MoonPhaseData {
  moonPhase: MoonPhase;
}

const defaultValue: MoonPhaseData = {
  moonPhase: "New Moon"
};

export const MoonPhaseContext = createContext<MoonPhaseData>(defaultValue);

interface MoonPhaseProviderProps {
  children: ReactNode;
  value: MoonPhaseData;
}

export function MoonPhaseProvider({ children, value }: MoonPhaseProviderProps) {
  return (
    <MoonPhaseContext.Provider value={value}>
      {children}
    </MoonPhaseContext.Provider>
  );
}