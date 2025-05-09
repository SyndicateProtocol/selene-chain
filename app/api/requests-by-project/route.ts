import { DASHBOARD_PROJECT_ID } from "@/lib/constants"
import { NextResponse } from "next/server"

const API_KEY = process.env.DASHBOARD_API_KEY

export async function GET() {
  try {
    const endpoint = `https://api.syndicate.io/wallet/project/${DASHBOARD_PROJECT_ID}/requests`

    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_KEY}`
      }
    })

    const responseData = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: responseData.message || "Failed to fetch project requests" },
        { status: response.status }
      )
    }

    // 1. filter out all invalid requests from TC
    // 2. query db for all invalid requests
    // 3. merge & sort by createdAt datetime

    return NextResponse.json({
      requests: responseData.transactionRequests || [],
      total: responseData.total || 0
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    )
  }
}
