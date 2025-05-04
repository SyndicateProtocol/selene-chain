import { useState } from "react"

export type LunarPhase =
  | "New Moon"
  | "Waxing Crescent"
  | "First Quarter"
  | "Waxing Gibbous"
  | "Full Moon"
  | "Waning Gibbous"
  | "Last Quarter"
  | "Waning Crescent"

export default function useLunarPhase(): LunarPhase {
  const [phase] = useState<LunarPhase>("Waning Gibbous")
  // In the future, this hook will fetch the actual lunar phase from the contract
  return phase
}
