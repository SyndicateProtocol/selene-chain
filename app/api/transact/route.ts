import { NextResponse } from "next/server"

const API_KEY = process.env.DASHBOARD_API_KEY

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const payload = {
      projectId: "74093453-7cc7-45a2-8bfc-2c186531858c",
      ...data
    }
    const response = await fetch(
      "https://api.syndicate.io/transact/sendTransaction",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }
    )

    const responseData = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { message: responseData.message || "Transaction failed" },
        { status: response.status }
      )
    }

    // Return the success response
    return NextResponse.json(responseData)
  } catch (error) {
    console.error("Transaction error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
