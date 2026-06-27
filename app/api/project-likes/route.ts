import { NextRequest, NextResponse } from "next/server"
import { getProjectLikes, incrementProjectLikes } from "@/lib/metrics-store"

export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  try {
    const ids = request.nextUrl.searchParams.get("ids")
    const projectIds = ids?.split(",") ?? []
    const result = await getProjectLikes(projectIds)
    return NextResponse.json({ likes: result.value, source: result.source })
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

    const result = await incrementProjectLikes(projectId)
    return NextResponse.json({ likes: result.value, source: result.source })
  } catch (error) {
    console.error("[project-likes][POST] database error", error)
    const message = error instanceof Error ? error.message : "Failed to increment project likes."
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
