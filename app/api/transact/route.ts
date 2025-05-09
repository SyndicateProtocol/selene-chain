import { db } from "@/db"
import {
  DASHBOARD_PROJECT_ID,
  MOONPHASE_PERMISSION_MODULE_ADDRESS,
  SYNDICATE_EXO
} from "@/lib/constants"
import { NextResponse } from "next/server"
import { createPublicClient, http } from "viem"

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
        if (
          payload.contractAddress ===
          "0xf2921af55d7d01d1441c58f3efa9ece1f405fbc2"
        ) {
          break
        }
        break
      case "First Quarter":
        break
      case "Waxing Gibbous":
        break
      case "Full Moon":
        break
      case "Waning Gibbous":
        break
      case "Last Quarter":
        break
      case "Waning Crescent":
        break
    }

    let responseData: any
    if (isInvalid) {
      // TODO: update shape of payload to be that of invalidTransactionRequest schema
      responseData = await db.saveInvalidTransactionRequest(payload)
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
