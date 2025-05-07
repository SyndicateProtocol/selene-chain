import { DASHBOARD_PROJECT_ID } from "@/lib/constants"
import { NextResponse } from "next/server"

const API_KEY = process.env.DASHBOARD_API_KEY

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const payload = {
      projectId: DASHBOARD_PROJECT_ID,
      ...data
    }

    const endpoint = `https://api.syndicate.io/wallet/project/${DASHBOARD_PROJECT_ID}/requests`
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
    const responseData = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { message: responseData.message || "Transaction failed" },
        { status: response.status }
      )
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
