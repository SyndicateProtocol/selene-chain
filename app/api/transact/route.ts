import { db } from "@/db"
import { MoonphasePermissionModuleAbi } from "@/lib/MoonphasePermissionModuleAbi"
import {
  DASHBOARD_PROJECT_ID,
  MOONPHASE_PERMISSION_MODULE_ADDRESS,
  SYNDICATE_EXO
} from "@/lib/constants"
import { NextResponse } from "next/server"
import { http, createPublicClient } from "viem"

const API_KEY = process.env.DASHBOARD_API_KEY

const exoClient = createPublicClient({
  chain: SYNDICATE_EXO,
  transport: http()
})

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const payload = {
      projectId: DASHBOARD_PROJECT_ID,
      ...data
    }

    const endpoint = payload.value
      ? "https://api.syndicate.io/transact/sendTransactionWithValue"
      : "https://api.syndicate.io/transact/sendTransaction"

    const currentPhase = await exoClient.readContract({
      address: MOONPHASE_PERMISSION_MODULE_ADDRESS,
      abi: MoonphasePermissionModuleAbi,
      functionName: "currentPhase"
    })

    let isInvalid = false
    switch (currentPhase) {
      case "New Moon":
        if (payload.functionSignature !== "newMoon()") {
          isInvalid = true
        }
        break
      case "Waxing Crescent":
        if (payload.functionSignature !== "waxingCrescent()") {
          isInvalid = true
        }
        break
      case "First Quarter":
        if (payload.functionSignature !== "firstQuarter(address") {
          isInvalid = true
        }
        break
      case "Waxing Gibbous":
        if (payload.functionSignature !== "waxingGibbous()") {
          isInvalid = true
        }
        break
      case "Full Moon":
        if (payload.functionSignature !== "mint(address,uint256)") {
          isInvalid = true
        }
        break
      case "Waning Gibbous":
        if (payload.functionSignature !== "waningGibbous()") {
          isInvalid = true
        }
        break
      case "Last Quarter":
        if (payload.functionSignature !== "lastQuarter(string[],address[])") {
          isInvalid = true
        }
        break
      case "Waning Crescent":
        if (payload.functionSignature !== "waningCrescent()") {
          isInvalid = true
        }
        break
    }

    let responseData: any
    if (isInvalid) {
      const invalidTransactionRequest = {
        projectId: payload.projectId,
        contractAddress: payload.contractAddress,
        chainId: payload.chainId,
        functionSignature: payload.functionSignature,
        data: payload?.data,
        value: payload?.value
      }

      responseData = await db.saveInvalidTransactionRequest(
        invalidTransactionRequest
      )
      responseData.invalid = true
      responseData.transactionAttempts = []
    } else {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })
      if (!response.ok) {
        return NextResponse.json(
          { message: responseData.message || "Transaction failed" },
          { status: response.status }
        )
      }
      responseData = await response.json()
    }

    return NextResponse.json(responseData)
  } catch (error) {
    console.error("Transaction error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
