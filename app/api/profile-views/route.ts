import { NextResponse } from "next/server"
import { proxyMetricsRequest } from "@/lib/metrics-backend"

export const runtime = "nodejs"

export async function GET() {
  try {
    return await proxyMetricsRequest("/profile-views", { method: "GET" })
  } catch (error) {
    console.error("[profile-views][GET] database error", error)
    const message = error instanceof Error ? error.message : "Failed to read profile views."
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function POST() {
  try {
    return await proxyMetricsRequest("/profile-views", { method: "POST" })
  } catch (error) {
    console.error("[profile-views][POST] database error", error)
    const message = error instanceof Error ? error.message : "Failed to increment profile views."
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
