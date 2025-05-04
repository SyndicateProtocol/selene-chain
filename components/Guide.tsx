"use client"

import { lunarPhases } from "@/lib/constants"
import useLunarPhase from "@/lib/hooks";

export default function Guide() {
  const currentPhase = useLunarPhase();

  const sortedPhases = [...lunarPhases].sort((a, b) => {
    if (a.name === currentPhase) return -1;
    if (b.name === currentPhase) return 1;
    return 0;
  });

  return (
    <div className="grid gap-2 max-w-96 min-w-72 font-geist">
      {sortedPhases.map((phase) => (
        <div
          key={phase.name}
          className={`px-2 py-2  flex items-center gap-4  rounded-xl border text-black backdrop-blur-sm ${phase.name === currentPhase ? " !bg-black text-white" : ""
            }`}
        >
          <span className="font-moonphases text-4xl">{phase.symbol}</span>
          <div className="leading-none">
            <h3 className="text-lg font-medium">{phase.name} Moon</h3>
            <p className="font-mono text-xs">{phase.priority}</p>
          </div>
          {phase.name === currentPhase && (
            <span className="bg-white text-black py-1 px-2 rounded-2xl  ml-auto text-[11px]">
              current
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
