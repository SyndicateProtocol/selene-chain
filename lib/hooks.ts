"use client"

import {
  type MoonPhase,
  MoonPhaseContext
} from "@/components/MoonPhaseProvider"
import { useContext } from "react"

export function useMoonPhase(): MoonPhase {
  const context = useContext(MoonPhaseContext)
  return context.moonPhase
}
