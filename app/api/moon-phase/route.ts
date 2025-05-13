import { getMoonPhaseData } from "@/lib/utils"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic" // to disable caching

export async function GET() {
  const data = await getMoonPhaseData()
  return NextResponse.json(data)
}
