import { MOONPHASE_PERMISSION_MODULE, SELENE_CHAIN } from "@/lib/constants"
import { NextResponse } from "next/server"
import { http, createPublicClient, getContract } from "viem"

// Minimal ABI for fetching current phase
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

export async function GET(request: Request) {
  try {
    const client = createPublicClient({
      chain: SELENE_CHAIN,
      transport: http()
    })

    const moonPhaseContract = getContract({
      address: MOONPHASE_PERMISSION_MODULE,
      abi: moonPhaseAbi,
      client
    })

    const currentMoonPhase = await moonPhaseContract.read.currentPhase()

    const blockNumber = await client.getBlockNumber()
    const block = await client.getBlock({ blockNumber })

    return NextResponse.json({
      moonPhase: currentMoonPhase,
      timestamp: block.timestamp.toString(),
      blockNumber: blockNumber.toString()
    })
  } catch (error) {
    console.error("Error fetching moon phase data:", error)
    return NextResponse.json(
      { error: "Failed to fetch moon phase data" },
      { status: 500 }
    )
  }
}
