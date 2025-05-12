"use client"

import { lunarPhases } from "@/lib/constants"
import { useMoonPhase } from "@/lib/hooks"

import { reorderLunarPhases } from "@/lib/utils"

export default function Guide() {
  const moonPhase = useMoonPhase()
  const sortedPhases = reorderLunarPhases(lunarPhases, moonPhase)

  return (
    <div className="grid gap-2 max-w-96 min-w-72 font-geist">
      {sortedPhases.map((phase) => (
        <div
          key={phase.name}
          className={`px-2 py-2  flex items-center gap-4  rounded-xl border text-black bg-white/40 backdrop-blur-sm ${
            phase.name === moonPhase ? " !bg-black text-white border-black" : ""
          }`}
        >
          <span className="font-moonphases text-4xl">{phase.symbol}</span>
          <div className="leading-none">
            <h3 className="text-lg font-medium">{phase.name}</h3>
            <p className="font-mono text-xs">{phase.priority}</p>
          </div>
          {phase.name === moonPhase && (
            <span className="bg-white text-black py-1 px-2 rounded-2xl  ml-auto text-[11px]">
              current
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
