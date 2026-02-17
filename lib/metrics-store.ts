import type { RowDataPacket } from "mysql2"
import { getMysqlPool } from "@/lib/mysql"

const PROFILE_VIEWS_KEY = "profile_views"

declare global {
  var __portfolioMetricsInitPromise: Promise<void> | undefined
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

async function ensureMetricsTables() {
  if (globalThis.__portfolioMetricsInitPromise) {
    return globalThis.__portfolioMetricsInitPromise
  }

  const pool = getMysqlPool()
  globalThis.__portfolioMetricsInitPromise = (async () => {
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
  })()

  return globalThis.__portfolioMetricsInitPromise
}

export async function getProfileViews() {
  await ensureMetricsTables()
  const pool = getMysqlPool()

  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT counter_value AS value FROM site_counters WHERE counter_key = ? LIMIT 1",
    [PROFILE_VIEWS_KEY],
  )

  return toNumber(rows[0]?.value)
}

export async function incrementProfileViews() {
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
}

export async function getProjectLikes(projectIds: string[]) {
  await ensureMetricsTables()
  const ids = normalizeProjectIds(projectIds)
  if (ids.length === 0) return {}

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
}

export async function incrementProjectLikes(projectId: string) {
  await ensureMetricsTables()
  const normalizedProjectId = normalizeProjectId(projectId)
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
}
