import { SELENE_CHAIN } from "@/lib/constants"
import { NextResponse } from "next/server"
import { http, createPublicClient } from "viem"
import type { Transaction } from "viem"

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

export async function GET(request: Request) {
  try {
    const client = createPublicClient({
      chain: SELENE_CHAIN,
      transport: http()
    })

    // Get the URL parameters
    const url = new URL(request.url)
    const fetchHistorical = url.searchParams.get("historical") === "true"
    const minTransactions = 20

    // Get the current block number
    const blockNumber = await client.getBlockNumber()
    const block = await client.getBlock({
      blockNumber,
      includeTransactions: true
    })

    // For regular requests, just return the latest block
    if (!fetchHistorical) {
      let txsWithTimestamp = [] as Array<any>
      if (block.transactions && Array.isArray(block.transactions)) {
        txsWithTimestamp = block.transactions.map((tx) => ({
          ...tx,
          blockTimestamp: block.timestamp
        }))
      }

      const serializedData = serializeBigInts({
        blockNumber,
        block,
        transactionsWithTimestamps: txsWithTimestamp
      })
      return NextResponse.json(serializedData)
    }

    // For historical requests, fetch additional blocks if needed
    let transactions: Transaction[] = []

    // Add transactions from the latest block with timestamp
    if (block.transactions && Array.isArray(block.transactions)) {
      const txsWithTimestamp = (block.transactions as Transaction[]).map(
        (tx) => ({
          ...tx,
          blockTimestamp: block.timestamp
        })
      )
      transactions = [...txsWithTimestamp]
    }

    // Continue fetching previous blocks until we have enough transactions
    const maxBlocks = 10 // Limit to prevent excessive API calls
    let currentBlockNumber = blockNumber - BigInt(1)
    let blocksProcessed = 1 // Start with 1 because we already processed the latest block

    while (
      transactions.length < minTransactions &&
      blocksProcessed < maxBlocks &&
      currentBlockNumber > BigInt(0)
    ) {
      const previousBlock = await client.getBlock({
        blockNumber: currentBlockNumber,
        includeTransactions: true
      })

      if (
        previousBlock.transactions &&
        Array.isArray(previousBlock.transactions)
      ) {
        const txsWithTimestamp = (
          previousBlock.transactions as Transaction[]
        ).map((tx) => ({
          ...tx,
          blockTimestamp: previousBlock.timestamp
        }))
        transactions.push(...txsWithTimestamp)
      }

      currentBlockNumber = currentBlockNumber - BigInt(1)
      blocksProcessed++
    }

    // Slice to include at most 50 transactions
    const trimmedTransactions = transactions.slice(0, 50)

    const serializedData = serializeBigInts({
      blockNumber,
      block,
      historicalTransactions: trimmedTransactions,
      blocksProcessed
    })

    return NextResponse.json(serializedData)
  } catch (error) {
    console.error("Error fetching blockchain data:", error)
    return NextResponse.json(
      { error: "Failed to fetch blockchain data" },
      { status: 500 }
    )
  }
}
