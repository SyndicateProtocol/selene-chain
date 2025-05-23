"use client"

import { type MoonPhase, MoonPhaseContext } from "@/components/Providers"
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query"
import { useContext } from "react"
import { useState } from "react"
import {
  MOONPHASE_INTERACTION_CONTRACT,
  MOONPHASE_MINT_CONTRACT,
  lunarPreferences
} from "./constants"

export function useMoonPhase(): MoonPhase {
  const context = useContext(MoonPhaseContext)
  return context.moonPhase
}

interface TransactionPayload {
  contractAddress: string
  chainId: number
  functionSignature: string
  args: Record<string, any>
  value?: string
}

export function useSendTransaction() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [transactionResult, setTransactionResult] = useState<any | null>(null)

  const currentPhase = useMoonPhase()

  const sendTransaction = async (
    functionSignature: string,
    args: Record<string, any>,
    options?: {
      value?: string
    }
  ) => {
    setIsLoading(true)
    setError(null)

    try {
      const contractAddress = functionSignature.includes("mint")
        ? MOONPHASE_MINT_CONTRACT
        : MOONPHASE_INTERACTION_CONTRACT
      const payload: TransactionPayload = {
        contractAddress,
        chainId: 63888,
        functionSignature,
        args
      }

      if (options?.value) {
        payload.value = options.value
      }

      const response = await fetch("/api/transact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Transaction failed")
      }

      setTransactionResult(data)
      return data
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Transaction failed"
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const isPreferredTransaction = (transactionType: string): boolean => {
    return lunarPreferences[currentPhase] === transactionType
  }

  const getPreferredTransactionType = (): string => {
    return lunarPreferences[currentPhase] || "highGas"
  }

  return {
    sendTransaction,
    isLoading,
    error,
    transactionResult,
    currentPhase,
    isPreferredTransaction,
    getPreferredTransactionType
  }
}

export type Transaction = {
  transactionId: string
  id: string
  hash: string
  contractAddress: string
  createdAt: string
  status: string
  invalid: boolean
  functionSignature: string
  transactionAttempts?: Array<{
    hash?: string
    status?: string
  }>
}

const PAGE_SIZE = 10

const fetchTransactions = async ({
  pageParam = 1
}): Promise<{
  requests: Transaction[]
  nextPage: number | null
}> => {
  const res = await fetch(
    `/api/requests-by-project?page=${pageParam}&pageSize=${PAGE_SIZE}`
  )
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.error || `HTTP error: ${res.status}`)
  }
  return data
}

export function useInfiniteTransactions() {
  return useInfiniteQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    refetchInterval: 5000 // 5 seconds
  })
}

export function useRefreshTransactions() {
  const queryClient = useQueryClient()

  return () => {
    return queryClient.invalidateQueries({ queryKey: ["transactions"] })
  }
}
