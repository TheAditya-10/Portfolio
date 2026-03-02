import type { RowDataPacket } from "mysql2"
import { getMysqlPool } from "@/lib/mysql"

const PROFILE_VIEWS_KEY = "profile_views"
const MYSQL_CONNECTION_ERROR_CODES = new Set([
  "ECONNREFUSED",
  "ECONNRESET",
  "ENETUNREACH",
  "ENOTFOUND",
  "EHOSTUNREACH",
  "ETIMEDOUT",
  "PROTOCOL_CONNECTION_LOST",
  "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR",
  "PROTOCOL_ENQUEUE_AFTER_QUIT",
])

export type MetricsSource = "mysql" | "memory"

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
  var __portfolioMetricsMysqlRetryAfter: number | undefined
}

function toNumber(value: unknown) {
  if (typeof value === "number") return value
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
  return parsePositiveInt(process.env.MYSQL_RETRY_COOLDOWN_MS, 30_000)
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

function isMysqlConnectivityError(error: unknown) {
  const code = getErrorCode(error)
  if (code && MYSQL_CONNECTION_ERROR_CODES.has(code)) {
    return true
  }

  if (error instanceof Error) {
    const message = error.message.toLowerCase()
    if (message.includes("timed out") || message.includes("connect")) {
      return true
    }
  }

  return false
}

function inMysqlRetryCooldown() {
  const retryAfter = globalThis.__portfolioMetricsMysqlRetryAfter
  if (!retryAfter) return false
  return retryAfter > Date.now()
}

function markMysqlUnavailable(error: unknown) {
  if (!isMysqlConnectivityError(error)) {
    return false
  }

  const wasCoolingDown = inMysqlRetryCooldown()
  globalThis.__portfolioMetricsMysqlRetryAfter = Date.now() + getRetryCooldownMs()
  globalThis.__portfolioMetricsInitPromise = undefined

  if (!wasCoolingDown) {
    const code = getErrorCode(error) ?? "UNKNOWN"
    console.error(`[metrics-store] MySQL unavailable (${code}). Using memory fallback temporarily.`)
  }

  return true
}

async function withStorageFallback<T>(mysqlOperation: () => Promise<T>, memoryOperation: () => T) {
  const canFallback = isMemoryFallbackEnabled()

  if (canFallback && inMysqlRetryCooldown()) {
    return { source: "memory", value: memoryOperation() } satisfies MetricResult<T>
  }

  try {
    const value = await mysqlOperation()
    globalThis.__portfolioMetricsMysqlRetryAfter = undefined
    return { source: "mysql", value } satisfies MetricResult<T>
  } catch (error) {
    const connectivityFailure = markMysqlUnavailable(error)
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

  const pool = getMysqlPool()
  globalThis.__portfolioMetricsInitPromise = (async () => {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS site_counters (
          counter_key VARCHAR(80) PRIMARY KEY,
          counter_value BIGINT UNSIGNED NOT NULL DEFAULT 0,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `)

      await pool.query(`
        CREATE TABLE IF NOT EXISTS project_likes (
          project_id VARCHAR(120) PRIMARY KEY,
          likes BIGINT UNSIGNED NOT NULL DEFAULT 0,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
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
      const pool = getMysqlPool()

      const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT counter_value AS value FROM site_counters WHERE counter_key = ? LIMIT 1",
        [PROFILE_VIEWS_KEY],
      )

      return toNumber(rows[0]?.value)
    },
    () => getMemoryStore().profileViews,
  )
}

export async function incrementProfileViews(): Promise<MetricResult<number>> {
  return withStorageFallback(
    async () => {
      await ensureMetricsTables()
      const pool = getMysqlPool()

      await pool.query(
        `
          INSERT INTO site_counters (counter_key, counter_value)
          VALUES (?, LAST_INSERT_ID(1))
          ON DUPLICATE KEY UPDATE counter_value = LAST_INSERT_ID(counter_value + 1)
        `,
        [PROFILE_VIEWS_KEY],
      )

      const [rows] = await pool.query<RowDataPacket[]>("SELECT LAST_INSERT_ID() AS value")
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
    return { source: "mysql", value: {} }
  }

  return withStorageFallback(
    async () => {
      await ensureMetricsTables()
      const pool = getMysqlPool()
      const placeholders = ids.map(() => "?").join(", ")
      const [rows] = await pool.query<RowDataPacket[]>(
        `SELECT project_id, likes FROM project_likes WHERE project_id IN (${placeholders})`,
        ids,
      )

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
      const pool = getMysqlPool()

      await pool.query(
        `
          INSERT INTO project_likes (project_id, likes)
          VALUES (?, LAST_INSERT_ID(1))
          ON DUPLICATE KEY UPDATE likes = LAST_INSERT_ID(likes + 1)
        `,
        [normalizedProjectId],
      )

      const [rows] = await pool.query<RowDataPacket[]>("SELECT LAST_INSERT_ID() AS value")
      return toNumber(rows[0]?.value)
    },
    () => {
      const store = getMemoryStore()
      store.projectLikes[normalizedProjectId] = toNumber(store.projectLikes[normalizedProjectId]) + 1
      return store.projectLikes[normalizedProjectId]
    },
  )
}
