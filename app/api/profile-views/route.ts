import { NextResponse } from "next/server"
import { getProfileViews, incrementProfileViews } from "@/lib/metrics-store"

export const runtime = "nodejs"

export async function GET() {
  try {
    const count = await getProfileViews()
    return NextResponse.json({ count, source: "mysql" }, { status: 200 })
  } catch (error) {
    console.error("[profile-views][GET] database error", error)
    const message = error instanceof Error ? error.message : "Failed to read profile views."
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function POST() {
  try {
    const count = await incrementProfileViews()
    return NextResponse.json({ count, source: "mysql" }, { status: 200 })
  } catch (error) {
    console.error("[profile-views][POST] database error", error)
    const message = error instanceof Error ? error.message : "Failed to increment profile views."
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
