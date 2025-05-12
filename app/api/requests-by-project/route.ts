import { db } from "@/db"
import { DASHBOARD_PROJECT_ID } from "@/lib/constants"
import { NextResponse } from "next/server"

const API_KEY = process.env.DASHBOARD_API_KEY

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const page = Number.parseInt(searchParams.get("page") || "1", 10)
    const pageSize = Number.parseInt(searchParams.get("pageSize") || "10", 10)

    const endpoint = `https://api.syndicate.io/wallet/project/${DASHBOARD_PROJECT_ID}/requests?page=${page}&pageSize=${pageSize}`

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

    const validRequests = responseData.transactionRequests.filter(
      (request: any) => !request.invalid
    )
    const invalidRequests = await db.getInvalidTransactionRequests()

    const mergedRequests = [
      ...validRequests,
      ...invalidRequests.map((r) => ({
        ...r,
        invalid: true,
        transactionAttempts: []
      }))
    ]

    const sortedRequests = mergedRequests.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    return NextResponse.json({
      requests: sortedRequests,
      total: responseData.total ?? sortedRequests.length,
      nextPage: sortedRequests.length < pageSize ? null : page + 1
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    )
  }
}
