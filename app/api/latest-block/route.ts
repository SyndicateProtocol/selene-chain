import { NextResponse } from "next/server"
import { http, createPublicClient } from "viem"
import { mainnet } from "viem/chains"

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
      chain: mainnet,
      transport: http(
        `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
      )
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
