import { NextRequest, NextResponse } from "next/server"
import { proxyMetricsRequest } from "@/lib/metrics-backend"

export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  try {
    const rawQuery = request.nextUrl.searchParams.toString()
    const path = rawQuery ? `/project-likes?${rawQuery}` : "/project-likes"
    return await proxyMetricsRequest(path, { method: "GET" })
  } catch (error) {
    console.error("[project-likes][GET] database error", error)
    const message = error instanceof Error ? error.message : "Failed to read project likes."
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as { projectId?: unknown }
    const projectId = typeof payload.projectId === "string" ? payload.projectId : ""
    if (!projectId.trim()) {
      return NextResponse.json({ error: "projectId is required." }, { status: 400 })
    }

    return await proxyMetricsRequest("/project-likes", {
      method: "POST",
      body: JSON.stringify({ projectId }),
    })
  } catch (error) {
    console.error("[project-likes][POST] database error", error)
    const message = error instanceof Error ? error.message : "Failed to increment project likes."
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
