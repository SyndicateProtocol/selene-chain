"use client"

import {
  type MoonPhase,
  MoonPhaseContext
} from "@/components/MoonPhaseProvider"
import { useContext } from "react"
import { useState } from "react"
import { MOONPHASE_INTERACTION_CONTRACT, lunarPreferences } from "./constants"

export function useMoonPhase(): MoonPhase {
  const context = useContext(MoonPhaseContext)
  return context.moonPhase
}

interface TransactionPayload {
  contractAddress: string
  chainId: number
  functionSignature: string
  value?: string
}

export function useLunarTransaction() {
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
      const payload: TransactionPayload = {
        contractAddress: MOONPHASE_INTERACTION_CONTRACT,
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
