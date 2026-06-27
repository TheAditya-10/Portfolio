import { getPostgresSql } from "@/lib/postgres"

const PROFILE_VIEWS_KEY = "profile_views"
const POSTGRES_CONNECTION_ERROR_CODES = new Set([
  "ECONNREFUSED",
  "ECONNRESET",
  "ENETUNREACH",
  "ENOTFOUND",
  "EHOSTUNREACH",
  "ETIMEDOUT",
  "57P01",
  "57P02",
  "57P03",
  "08000",
  "08003",
  "08006",
  "08001",
])

export type MetricsSource = "postgres" | "memory"

type MetricResult<T> = {
  source: MetricsSource
  value: T
}

type MetricsMemoryStore = {
  profileViews: number
  projectLikes: Record<string, number>
}

declare global {
  var __portfolioMetricsInitPromise: Promise<void> | undefined
  var __portfolioMetricsMemoryStore: MetricsMemoryStore | undefined
  var __portfolioMetricsPostgresRetryAfter: number | undefined
}

function toNumber(value: unknown) {
  if (typeof value === "number") return value
  if (typeof value === "bigint") return Number(value)
  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10)
    if (Number.isFinite(parsed)) return parsed
  }
  return 0
}

function normalizeProjectId(projectId: string) {
  const normalized = projectId.trim()
  if (!normalized) {
    throw new Error("Project ID is required.")
  }
  if (normalized.length > 120) {
    throw new Error("Project ID is too long.")
  }
  return normalized
}

function normalizeProjectIds(projectIds: string[]) {
  const unique = new Set<string>()
  for (const id of projectIds) {
    const trimmed = id.trim()
    if (!trimmed) continue
    if (trimmed.length > 120) continue
    unique.add(trimmed)
  }
  return [...unique]
}

function parsePositiveInt(value: string | undefined, fallback: number) {
  if (!value) return fallback
  const parsed = Number.parseInt(value, 10)
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback
  }
  return parsed
}

function isMemoryFallbackEnabled() {
  return process.env.METRICS_MEMORY_FALLBACK !== "false"
}

function getRetryCooldownMs() {
  return parsePositiveInt(process.env.POSTGRES_RETRY_COOLDOWN_MS, 30_000)
}

function getMemoryStore() {
  if (!globalThis.__portfolioMetricsMemoryStore) {
    globalThis.__portfolioMetricsMemoryStore = {
      profileViews: 0,
      projectLikes: {},
    }
  }
  return globalThis.__portfolioMetricsMemoryStore
}

function getErrorCode(error: unknown) {
  if (!error || typeof error !== "object" || !("code" in error)) return undefined
  const code = (error as { code?: unknown }).code
  return typeof code === "string" ? code : undefined
}

function isPostgresConnectivityError(error: unknown) {
  const code = getErrorCode(error)
  if (code && POSTGRES_CONNECTION_ERROR_CODES.has(code)) {
    return true
  }

  if (error instanceof Error) {
    const message = error.message.toLowerCase()
    return (
      message.includes("missing postgres config") ||
      message.includes("timed out") ||
      message.includes("connect") ||
      message.includes("fetch failed")
    )
  }

  return false
}

function inPostgresRetryCooldown() {
  const retryAfter = globalThis.__portfolioMetricsPostgresRetryAfter
  if (!retryAfter) return false
  return retryAfter > Date.now()
}

function markPostgresUnavailable(error: unknown) {
  if (!isPostgresConnectivityError(error)) {
    return false
  }

  const wasCoolingDown = inPostgresRetryCooldown()
  globalThis.__portfolioMetricsPostgresRetryAfter = Date.now() + getRetryCooldownMs()
  globalThis.__portfolioMetricsInitPromise = undefined

  if (!wasCoolingDown) {
    const code = getErrorCode(error) ?? "UNKNOWN"
    console.error(`[metrics-store] Postgres unavailable (${code}). Using memory fallback temporarily.`)
  }

  return true
}

async function withStorageFallback<T>(postgresOperation: () => Promise<T>, memoryOperation: () => T) {
  const canFallback = isMemoryFallbackEnabled()

  if (canFallback && inPostgresRetryCooldown()) {
    return { source: "memory", value: memoryOperation() } satisfies MetricResult<T>
  }

  try {
    const value = await postgresOperation()
    globalThis.__portfolioMetricsPostgresRetryAfter = undefined
    return { source: "postgres", value } satisfies MetricResult<T>
  } catch (error) {
    const connectivityFailure = markPostgresUnavailable(error)
    if (!canFallback || !connectivityFailure) {
      throw error
    }

    return { source: "memory", value: memoryOperation() } satisfies MetricResult<T>
  }
}

async function ensureMetricsTables() {
  if (globalThis.__portfolioMetricsInitPromise) {
    return globalThis.__portfolioMetricsInitPromise
  }

  const sql = getPostgresSql()
  globalThis.__portfolioMetricsInitPromise = (async () => {
    try {
      await sql.query(`
        CREATE TABLE IF NOT EXISTS site_counters (
          counter_key TEXT PRIMARY KEY,
          counter_value BIGINT NOT NULL DEFAULT 0,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `)

      await sql.query(`
        CREATE TABLE IF NOT EXISTS project_likes (
          project_id TEXT PRIMARY KEY,
          likes BIGINT NOT NULL DEFAULT 0,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `)
    } catch (error) {
      globalThis.__portfolioMetricsInitPromise = undefined
      throw error
    }
  })()

  return globalThis.__portfolioMetricsInitPromise
}

export async function getProfileViews(): Promise<MetricResult<number>> {
  return withStorageFallback(
    async () => {
      await ensureMetricsTables()
      const sql = getPostgresSql()

      const rows = await sql.query("SELECT counter_value AS value FROM site_counters WHERE counter_key = $1 LIMIT 1", [
        PROFILE_VIEWS_KEY,
      ])

      return toNumber(rows[0]?.value)
    },
    () => getMemoryStore().profileViews,
  )
}

export async function incrementProfileViews(): Promise<MetricResult<number>> {
  return withStorageFallback(
    async () => {
      await ensureMetricsTables()
      const sql = getPostgresSql()

      const rows = await sql.query(
        `
          INSERT INTO site_counters (counter_key, counter_value, updated_at)
          VALUES ($1, 1, NOW())
          ON CONFLICT (counter_key)
          DO UPDATE SET counter_value = site_counters.counter_value + 1, updated_at = NOW()
          RETURNING counter_value AS value
        `,
        [PROFILE_VIEWS_KEY],
      )

      return toNumber(rows[0]?.value)
    },
    () => {
      const store = getMemoryStore()
      store.profileViews += 1
      return store.profileViews
    },
  )
}

export async function getProjectLikes(projectIds: string[]): Promise<MetricResult<Record<string, number>>> {
  const ids = normalizeProjectIds(projectIds)
  if (ids.length === 0) {
    return { source: "postgres", value: {} }
  }

  return withStorageFallback(
    async () => {
      await ensureMetricsTables()
      const sql = getPostgresSql()
      const rows = await sql.query("SELECT project_id, likes FROM project_likes WHERE project_id = ANY($1::text[])", [
        ids,
      ])

      const likes: Record<string, number> = {}
      for (const id of ids) {
        likes[id] = 0
      }

      for (const row of rows) {
        const projectId = typeof row.project_id === "string" ? row.project_id : ""
        if (!projectId) continue
        likes[projectId] = toNumber(row.likes)
      }

      return likes
    },
    () => {
      const store = getMemoryStore()
      const likes: Record<string, number> = {}
      for (const id of ids) {
        likes[id] = toNumber(store.projectLikes[id])
      }
      return likes
    },
  )
}

export async function incrementProjectLikes(projectId: string): Promise<MetricResult<number>> {
  const normalizedProjectId = normalizeProjectId(projectId)

  return withStorageFallback(
    async () => {
      await ensureMetricsTables()
      const sql = getPostgresSql()

      const rows = await sql.query(
        `
          INSERT INTO project_likes (project_id, likes, updated_at)
          VALUES ($1, 1, NOW())
          ON CONFLICT (project_id)
          DO UPDATE SET likes = project_likes.likes + 1, updated_at = NOW()
          RETURNING likes AS value
        `,
        [normalizedProjectId],
      )

      return toNumber(rows[0]?.value)
    },
    () => {
      const store = getMemoryStore()
      store.projectLikes[normalizedProjectId] = toNumber(store.projectLikes[normalizedProjectId]) + 1
      return store.projectLikes[normalizedProjectId]
    },
  )
}
