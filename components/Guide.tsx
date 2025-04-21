"use client"

import { lunarPhases } from "@/lib/constants"

export default function Guide() {
  // TODO: update after call to lunar phase contract
  const currentPhase = "Waning Gibbous Moon"

  return (
    <div className="grid gap-2 max-w-96 my-12 font-geist">
      {lunarPhases.map((phase) => (
        <div
          key={phase.name}
          className={`px-2 py-2  flex items-center gap-4  bg-gray text-white backdrop-blur-sm ${
            phase.name === currentPhase ? " !bg-black text-white" : ""
          }`}
        >
          <span className="font-moonphases text-4xl">{phase.symbol}</span>
          <div className="leading-none">
            <h3 className="text-lg font-medium">{phase.name}</h3>
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
