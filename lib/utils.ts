import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { LunarPhaseInterface } from "./constants"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function reorderLunarPhases(
  phases: LunarPhaseInterface[],
  firstPhaseName: string
): LunarPhaseInterface[] {
  const index = phases.findIndex((phase) => phase.name === firstPhaseName)
  if (index === -1) {
    return phases
  }
  const firstPart = phases.slice(index)
  const secondPart = phases.slice(0, index)
  return firstPart.concat(secondPart)
}
