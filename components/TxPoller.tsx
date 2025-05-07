"use client"

import { useTransactions } from "@/lib/hooks";
import { getBlockExplorerUrl, getTransactionHash } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns"
import { ArrowUpRight, Clock, Code, Hash } from "lucide-react"

function formatTimestamp(timestamp: string): string {
  try {
    const date = new Date(timestamp);
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    console.error("Error formatting timestamp:", error);
    return "Just now";
  }
}

export default function TxPoller() {
  const {
    data: transactions,
    isLoading,
    isError,
    error
  } = useTransactions();

  return (
    <section className="w-full basis-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Latest Transactions</h2>
      </div>
      {isLoading && (
        <div className="bg-white/40 border border-gray-light backdrop-blur-sm rounded-xl p-6 flex justify-center items-center h-40">
          <div className="flex flex-col items-center gap-2">
            <div className="h-5 w-5 border-2 border-t-transparent border-black/30 rounded-full animate-spin" />
            <p className="text-sm text-black/70">Fetching transactions...</p>
          </div>
        </div>
      )}

      {isError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <p className="text-red-600">
            <strong>Error:</strong> {error.message}
          </p>
        </div>
      )}

      {!isLoading && !isError && transactions && (
        <div className="space-y-2">
          {transactions.length === 0 ? (
            <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 text-center">
              <p className="text-black/70">No transactions found</p>
            </div>
          ) : (
            transactions.map((tx, index) => (
              <div
                key={getTransactionHash(tx) || index}
                className={`bg-white/40 backdrop-blur-sm rounded-xl p-4 transition-all ${tx.invalid ? "border-2 border-red-500" : "border border-gray-light"
                  }`}
              >
                <div className="grid gap-2">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <Hash className="h-4 w-4 flex-shrink-0 text-black/50" />
                    <a
                      href={getBlockExplorerUrl(tx)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono overflow-hidden text-ellipsis hover:underline flex items-center gap-1"
                      title={getTransactionHash(tx)}
                    >
                      {getTransactionHash(tx)}
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                  {tx.functionSignature && (
                    <div className="flex items-center gap-2 overflow-hidden">
                      <Code className="h-4 w-4 flex-shrink-0 text-black/50" />
                      <p className="text-xs font-mono overflow-hidden text-ellipsis">
                        {tx.functionSignature}
                      </p>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs mt-1">
                    <div>
                      {tx.invalid && (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">
                          Failed
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-black/60">
                      <Clock className="h-3.5 w-3.5" />
                      <span>
                        {tx.createdAt ? formatTimestamp(tx.createdAt) : "Just now"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
}