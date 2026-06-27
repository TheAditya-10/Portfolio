import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { z } from "zod"
import portfolio from "@/data/portfolio.json"

export const runtime = "nodejs"

const enquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(7).max(30),
  service: z.string().trim().min(2).max(120),
  message: z.string().trim().min(10).max(3000),
})

export async function POST(request: Request) {
  const parsed = enquirySchema.safeParse(await request.json().catch(() => null))

  if (!parsed.success) {
    return NextResponse.json({ error: "Please fill all enquiry fields correctly." }, { status: 400 })
  }

  const smtpHost = process.env.SMTP_HOST
  const smtpPort = Number(process.env.SMTP_PORT ?? 587)
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const smtpFrom = process.env.SMTP_FROM ?? smtpUser
  const ownerEmail = process.env.ENQUIRY_TO ?? portfolio.profile.email

  if (!smtpHost || !smtpUser || !smtpPass || !smtpFrom) {
    return NextResponse.json(
      { error: "SMTP is not configured yet. Please email directly for now." },
      { status: 500 },
    )
  }

  const enquiry = parsed.data
  const submittedAt = new Date().toISOString()
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: process.env.SMTP_SECURE === "true" || smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })

  const ownerSubject = `New ${enquiry.service} enquiry from ${enquiry.name}`
  const ownerText = [
    "New website enquiry",
    "",
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    `Phone: ${enquiry.phone}`,
    `Service: ${enquiry.service}`,
    `Submitted: ${submittedAt}`,
    "",
    "Project details:",
    enquiry.message,
  ].join("\n")

  const confirmationSubject = "We received your enquiry"
  const confirmationText = [
    `Hi ${enquiry.name},`,
    "",
    "Thanks for reaching out. I received your enquiry and will contact you soon.",
    "",
    `Selected service: ${enquiry.service}`,
    "",
    "Your message:",
    enquiry.message,
    "",
    "Regards,",
    portfolio.profile.name,
  ].join("\n")

  try {
    await Promise.all([
      transporter.sendMail({
        from: smtpFrom,
        to: ownerEmail,
        replyTo: enquiry.email,
        subject: ownerSubject,
        text: ownerText,
        html: renderOwnerEmail(enquiry, submittedAt),
      }),
      transporter.sendMail({
        from: smtpFrom,
        to: enquiry.email,
        replyTo: ownerEmail,
        subject: confirmationSubject,
        text: confirmationText,
        html: renderConfirmationEmail(enquiry),
      }),
    ])

    return NextResponse.json({ message: "Your enquiry has been sent. I will contact you soon." })
  } catch (error) {
    console.error("Unable to send enquiry email", error)
    return NextResponse.json(
      { error: "Unable to send enquiry right now. Please email directly for now." },
      { status: 500 },
    )
  }
}

function renderOwnerEmail(enquiry: z.infer<typeof enquirySchema>, submittedAt: string) {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
      <h2>New website enquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(enquiry.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(enquiry.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(enquiry.phone)}</p>
      <p><strong>Service:</strong> ${escapeHtml(enquiry.service)}</p>
      <p><strong>Submitted:</strong> ${escapeHtml(submittedAt)}</p>
      <h3>Project details</h3>
      <p>${escapeHtml(enquiry.message).replace(/\n/g, "<br />")}</p>
    </div>
  `
}

function renderConfirmationEmail(enquiry: z.infer<typeof enquirySchema>) {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
      <h2>We received your enquiry</h2>
      <p>Hi ${escapeHtml(enquiry.name)},</p>
      <p>Thanks for reaching out. I received your enquiry and will contact you soon.</p>
      <p><strong>Selected service:</strong> ${escapeHtml(enquiry.service)}</p>
      <h3>Your message</h3>
      <p>${escapeHtml(enquiry.message).replace(/\n/g, "<br />")}</p>
      <p>Regards,<br />${escapeHtml(portfolio.profile.name)}</p>
    </div>
  `
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
