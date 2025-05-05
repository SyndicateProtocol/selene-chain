import { SELENE_CHAIN } from "@/lib/constants"
import { NextResponse } from "next/server"
import { http, createPublicClient } from "viem"

function serializeBigInts(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj
  }

  if (typeof obj === "bigint") {
    return obj.toString()
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => serializeBigInts(item))
  }

  if (typeof obj === "object") {
    const result: any = {}
    for (const key in obj) {
      result[key] = serializeBigInts(obj[key])
    }
    return result
  }

  return obj
}

export async function GET() {
  try {
    const client = createPublicClient({
      chain: SELENE_CHAIN,
      transport: http()
    })

    const blockNumber = await client.getBlockNumber()
    const block = await client.getBlock({
      blockNumber,
      includeTransactions: true
    })

    const serializedData = serializeBigInts({
      blockNumber,
      block
    })

    return NextResponse.json(serializedData)
  } catch (error) {
    console.error("Error fetching latest block:", error)
    return NextResponse.json(
      { error: "Failed to fetch blockchain data" },
      { status: 500 }
    )
  }
}
