import { NextRequest, NextResponse } from "next/server"
import { getProjectLikes, incrementProjectLikes } from "@/lib/metrics-store"

export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  try {
    const rawIds = request.nextUrl.searchParams.get("ids") ?? ""
    const ids = rawIds
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean)

    const likes = await getProjectLikes(ids)
    return NextResponse.json({ likes, source: "mysql" }, { status: 200 })
  } catch (error) {
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

    const likes = await incrementProjectLikes(projectId)
    return NextResponse.json({ projectId, likes, source: "mysql" }, { status: 200 })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to increment project likes."
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
