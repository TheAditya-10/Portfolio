import { getPostgresSql } from "@/lib/postgres"

export type EnquiryPayload = {
  name: string
  email: string
  phone: string
  service: string
  message: string
  userAgent?: string
  source?: string
}

export type EnquiryEmailStatus = "pending" | "sent" | "failed" | "smtp_not_configured"

declare global {
  var __portfolioEnquiriesInitPromise: Promise<void> | undefined
}

export async function ensureEnquiryTable() {
  if (globalThis.__portfolioEnquiriesInitPromise) {
    return globalThis.__portfolioEnquiriesInitPromise
  }

  const sql = getPostgresSql()
  globalThis.__portfolioEnquiriesInitPromise = (async () => {
    try {
      await sql.query(`
        CREATE TABLE IF NOT EXISTS service_enquiries (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT NOT NULL,
          service TEXT NOT NULL,
          message TEXT NOT NULL,
          source TEXT,
          user_agent TEXT,
          email_status TEXT NOT NULL DEFAULT 'pending',
          email_error TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `)

      await sql.query(`
        CREATE INDEX IF NOT EXISTS service_enquiries_created_at_idx
        ON service_enquiries (created_at DESC);
      `)
    } catch (error) {
      globalThis.__portfolioEnquiriesInitPromise = undefined
      throw error
    }
  })()

  return globalThis.__portfolioEnquiriesInitPromise
}

export async function createEnquiry(payload: EnquiryPayload) {
  await ensureEnquiryTable()
  const sql = getPostgresSql()
  const rows = await sql.query(
    `
      INSERT INTO service_enquiries (name, email, phone, service, message, source, user_agent)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `,
    [
      payload.name,
      payload.email,
      payload.phone,
      payload.service,
      payload.message,
      payload.source ?? "website",
      payload.userAgent ?? null,
    ],
  )

  return String(rows[0]?.id ?? "")
}

export async function updateEnquiryEmailStatus(id: string, status: EnquiryEmailStatus, error?: string) {
  if (!id) return

  await ensureEnquiryTable()
  const sql = getPostgresSql()
  await sql.query(
    `
      UPDATE service_enquiries
      SET email_status = $2, email_error = $3, updated_at = NOW()
      WHERE id = $1
    `,
    [id, status, error?.slice(0, 1000) ?? null],
  )
}
