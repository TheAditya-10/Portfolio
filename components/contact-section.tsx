"use client"

import type { FormEvent } from "react"
import { useState } from "react"
import { Mail, MapPin, Phone, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import portfolio from "@/data/portfolio.json"
import { serviceOptions } from "@/lib/service-data"

type EnquiryState = "idle" | "loading" | "success" | "error"

export function ContactSection() {
  const [state, setState] = useState<EnquiryState>("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState("loading")
    setMessage("")

    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      service: String(formData.get("service") ?? ""),
      message: String(formData.get("message") ?? ""),
    }

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = (await response.json()) as { message?: string; error?: string }
      if (!response.ok) {
        throw new Error(data.error ?? "Unable to submit enquiry.")
      }
      setState("success")
      setMessage(data.message ?? "Your enquiry has been sent.")
      form.reset()
    } catch (error) {
      setState("error")
      setMessage(error instanceof Error ? error.message : "Unable to submit enquiry.")
    }
  }

  return (
    <section id="enquiry" className="border-t border-border/70 py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">Enquiry</p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground md:text-4xl">
            Tell me what you want to build.
          </h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            Use this form for AI app development, software development, chatbot, RAG, automation,
            backend, SaaS, dashboard, or deployment enquiries.
          </p>
          <div className="mt-8 space-y-3 text-sm text-muted-foreground">
            <a
              className="flex items-center gap-3 rounded-xl border border-border bg-card/70 px-4 py-3 transition hover:border-primary/40"
              href={`mailto:${portfolio.profile.email}`}
            >
              <Mail className="h-4 w-4 text-primary" />
              {portfolio.profile.email}
            </a>
            <a
              className="flex items-center gap-3 rounded-xl border border-border bg-card/70 px-4 py-3 transition hover:border-primary/40"
              href={`tel:${portfolio.profile.phone.replace(/[^+\d]/g, "")}`}
            >
              <Phone className="h-4 w-4 text-primary" />
              {portfolio.profile.phone}
            </a>
            <span className="flex items-center gap-3 rounded-xl border border-border bg-card/70 px-4 py-3">
              <MapPin className="h-4 w-4 text-primary" />
              {portfolio.profile.location}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card/80 p-6 shadow-xl">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground">Name</span>
              <Input name="name" placeholder="Your name" required minLength={2} autoComplete="name" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground">Email</span>
              <Input name="email" type="email" placeholder="you@example.com" required autoComplete="email" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground">Phone number</span>
              <Input name="phone" type="tel" placeholder="+91 98765 43210" required autoComplete="tel" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground">Service</span>
              <select
                name="service"
                required
                defaultValue=""
                className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm outline-none transition-[color,box-shadow] focus-visible:ring-[3px]"
              >
                <option value="" disabled>
                  Select a service
                </option>
                {serviceOptions.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="mt-5 block space-y-2">
            <span className="text-sm font-medium text-foreground">Project details</span>
            <Textarea
              name="message"
              placeholder="What do you want to build, automate, improve, or launch?"
              className="min-h-[150px]"
              required
              minLength={10}
            />
          </label>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-muted-foreground">
              You will get an automatic confirmation email after submission.
            </p>
            <Button type="submit" disabled={state === "loading"} className="sm:min-w-[170px]">
              <Send className="h-4 w-4" />
              {state === "loading" ? "Submitting..." : "Submit Enquiry"}
            </Button>
          </div>

          {message ? (
            <p
              className={`mt-4 rounded-md border px-3 py-2 text-sm ${
                state === "success"
                  ? "border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-300"
                  : "border-destructive/30 bg-destructive/10 text-destructive"
              }`}
              role="status"
            >
              {message}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  )
}
