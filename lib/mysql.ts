import mysql, { type Pool } from "mysql2/promise"

declare global {
  var __portfolioMysqlPool: Pool | undefined
}

function parsePort(value: string | undefined) {
  const port = Number.parseInt(value ?? "3306", 10)
  if (!Number.isFinite(port)) {
    throw new Error("Invalid MYSQL_PORT. Expected a numeric value.")
  }
  return port
}

function parseConnectTimeout(value: string | undefined) {
  const timeout = Number.parseInt(value ?? "5000", 10)
  if (!Number.isFinite(timeout) || timeout <= 0) {
    throw new Error("Invalid MYSQL_CONNECT_TIMEOUT_MS. Expected a positive numeric value.")
  }
  return timeout
}

function getSslConfig() {
  if (process.env.MYSQL_SSL !== "true") return undefined
  return { rejectUnauthorized: false }
}

function createPool() {
  const connectionUrl = process.env.MYSQL_URL ?? process.env.DATABASE_URL
  const ssl = getSslConfig()

  if (connectionUrl) {
    return mysql.createPool({
      uri: connectionUrl,
      ssl,
      connectTimeout: parseConnectTimeout(process.env.MYSQL_CONNECT_TIMEOUT_MS),
      enableKeepAlive: true,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    })
  }

  const host = process.env.MYSQL_HOST
  const user = process.env.MYSQL_USER
  const database = process.env.MYSQL_DATABASE

  if (!host || !user || !database) {
    throw new Error(
      "Missing MySQL config. Set MYSQL_URL (or DATABASE_URL) or MYSQL_HOST, MYSQL_USER, and MYSQL_DATABASE.",
    )
  }

  return mysql.createPool({
    host,
    port: parsePort(process.env.MYSQL_PORT),
    user,
    password: process.env.MYSQL_PASSWORD,
    database,
    ssl,
    connectTimeout: parseConnectTimeout(process.env.MYSQL_CONNECT_TIMEOUT_MS),
    enableKeepAlive: true,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  })
}

export function getMysqlPool() {
  if (!globalThis.__portfolioMysqlPool) {
    globalThis.__portfolioMysqlPool = createPool()
  }
  return globalThis.__portfolioMysqlPool
}
