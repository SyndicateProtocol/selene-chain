import { MOONPHASE_PERMISSION_MODULE, SELENE_CHAIN } from "@/lib/constants"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { http, createPublicClient, getContract } from "viem"
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

const moonPhaseAbi = [
  {
    inputs: [],
    name: "currentPhase",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
] as const
export interface MoonPhaseData {
  moonPhase: string
}

export async function getMoonPhaseData(): Promise<MoonPhaseData> {
  const client = createPublicClient({
    chain: SELENE_CHAIN,
    transport: http()
  })

  const moonPhaseContract = getContract({
    address: MOONPHASE_PERMISSION_MODULE,
    abi: moonPhaseAbi,
    client
  })

  try {
    const currentPhase = await moonPhaseContract.read.currentPhase()

    return {
      moonPhase: currentPhase as MoonPhaseData["moonPhase"]
    }
  } catch (error) {
    console.error("Error fetching moon phase:", error)
    // Return a fallback value in case of error
    return {
      moonPhase: "New Moon"
    }
  }
}
