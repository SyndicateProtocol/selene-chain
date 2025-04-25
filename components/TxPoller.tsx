"use client"
import { Clock, Fuel, Hash } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import type { Transaction } from "viem"

export default function TxPoller() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [blockNumber, setBlockNumber] = useState<string | null>(null)
  const pollingInterval = 15000 // 15s

  const fetchLatestBlock = useCallback(async () => {
    try {
      const response = await fetch("/api/latest-block")
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
      }
      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }
      // If already on the latest block, do nothing
      if (data.blockNumber === blockNumber) {
        return
      }

      setBlockNumber(data.blockNumber)
      if (data.block.transactions && Array.isArray(data.block.transactions)) {
        setTransactions((prev) => {
          const newTxs = data.block.transactions as Transaction[]
          const updated = [...newTxs, ...prev]
          return updated.slice(0, 50) // Keep only the latest 50 txs
        })
      }
      setError(null)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching latest block:", error)
      setError("Failed to fetch latest block")
      setIsLoading(false)
    }
  }, [blockNumber])

  useEffect(() => {
    // Initial fetch
    fetchLatestBlock()
    // Set up polling interval
    const interval = setInterval(fetchLatestBlock, pollingInterval)
    // Cleanup
    return () => {
      clearInterval(interval)
    }
  }, [fetchLatestBlock])

  return (
    <section className="w-full my-12 basis-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Latest Transactions</h2>
      </div>
      {isLoading && (
        <div className="bg-black/5 backdrop-blur-sm rounded-xl p-6 flex justify-center items-center h-40">
          <div className="flex flex-col items-center gap-2">
            <div className="h-5 w-5 border-2 border-t-transparent border-black/30  rounded-full animate-spin" />

            <p className="text-sm text-black/70">Fetching transactions...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {!isLoading && !error && (
        <div className="space-y-2 overflow-y-auto max-h-[70vh]">
          {transactions.length === 0 ? (
            <div className="bg-black/5 backdrop-blur-sm rounded-xl p-6 text-center">
              <p className="text-black/70">No transactions found</p>
            </div>
          ) : (
            transactions.map((tx) => (
              <div
                key={tx.hash}
                className="bg-black/5 backdrop-blur-sm rounded-xl p-4 transition-all"
              >
                <div className="grid gap-2">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <Hash className="h-4 w-4 flex-shrink-0 text-black/50" />
                    <p
                      className="text-xs font-mono overflow-hidden text-ellipsis"
                      title={tx.hash as string}
                    >
                      {tx.hash as string}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-black/60">
                      <Fuel className="h-3.5 w-3.5" />
                      <span>
                        {tx.gas ? Number(tx.gas).toLocaleString() : "N/A"} gas
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-black/60">
                      <Clock className="h-3.5 w-3.5" />
                      <span>Just now</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  )
}
