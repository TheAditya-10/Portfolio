import { neon, type NeonQueryFunction } from "@neondatabase/serverless"

declare global {
  var __portfolioPostgresSql: NeonQueryFunction<false, false> | undefined
}

function getConnectionString() {
  const connectionString =
    process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? process.env.POSTGRES_PRISMA_URL ?? process.env.NEON_DATABASE_URL

  if (!connectionString?.trim()) {
    throw new Error("Missing Postgres config. Set DATABASE_URL or POSTGRES_URL to your Neon connection string.")
  }

  return connectionString
}

export function getPostgresSql() {
  if (!globalThis.__portfolioPostgresSql) {
    globalThis.__portfolioPostgresSql = neon(getConnectionString(), {
      fetchOptions: {
        signal: AbortSignal.timeout(Number.parseInt(process.env.POSTGRES_CONNECT_TIMEOUT_MS ?? "5000", 10)),
      },
    })
  }

  return globalThis.__portfolioPostgresSql
}
