"use client"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
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

interface ProvidersProps {
  children: ReactNode;
  value: MoonPhaseData;
}

const queryClient = new QueryClient()

export function Providers({ children, value }: ProvidersProps) {
  return (
    <MoonPhaseContext.Provider value={value}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </MoonPhaseContext.Provider>
  );
}