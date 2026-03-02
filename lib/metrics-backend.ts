import { NextResponse } from "next/server"

function getMetricsBackendConfig() {
  const baseUrl = process.env.METRICS_BACKEND_URL?.trim().replace(/\/+$/, "")
  const secret = process.env.METRICS_BACKEND_SECRET?.trim()

  if (!baseUrl) {
    throw new Error("Missing METRICS_BACKEND_URL.")
  }

  if (!secret) {
    throw new Error("Missing METRICS_BACKEND_SECRET.")
  }

  return { baseUrl, secret }
}

export async function proxyMetricsRequest(path: string, init: RequestInit = {}) {
  const { baseUrl, secret } = getMetricsBackendConfig()
  const headers = new Headers(init.headers)
  headers.set("x-metrics-secret", secret)

  if (init.body && !headers.has("content-type")) {
    headers.set("content-type", "application/json")
  }

  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  })

  const raw = await response.text()
  if (!raw) {
    return NextResponse.json({}, { status: response.status })
  }

  try {
    const payload = JSON.parse(raw) as unknown
    return NextResponse.json(payload, { status: response.status })
  } catch {
    return NextResponse.json({ error: "Invalid metrics backend response." }, { status: 502 })
  }
}
