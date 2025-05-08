import type { MoonPhaseData } from "@/components/Providers"
import { MOONPHASE_PERMISSION_MODULE, SYNDICATE_EXO } from "@/lib/constants"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { http, createPublicClient, getContract } from "viem"
import type { LunarPhaseInterface } from "./constants"
import type { Transaction } from "./hooks"

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

export async function getMoonPhaseData(): Promise<MoonPhaseData> {
  const client = createPublicClient({
    chain: SYNDICATE_EXO,
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

export const getTransactionHash = (tx: Transaction): string | null => {
  if (tx.hash) return tx.hash

  if (tx.transactionAttempts && tx.transactionAttempts.length > 0) {
    const attemptWithHash = tx.transactionAttempts.find(
      (attempt) => attempt?.hash
    )
    if (attemptWithHash?.hash) {
      return attemptWithHash.hash
    }
  }
  return null
}

export const getBlockExplorerUrl = (tx: Transaction): string => {
  const hash = getTransactionHash(tx)
  return `https://selene.explorer.testnet.syndicate.io/tx/${hash}`
}
