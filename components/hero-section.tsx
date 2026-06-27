"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2, FileText, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import portfolio from "@/data/portfolio.json"

const stats = [
  { value: "AI + SaaS", label: "Product builds" },
  { value: "FastAPI", label: "Backend specialty" },
  { value: "RAG", label: "Knowledge systems" },
  { value: "350+", label: "DSA problems solved" },
]

const proof = [
  "Custom AI app development",
  "Generative AI features",
  "RAG knowledge bases",
  "Workflow automation",
]

export function HeroSection() {
  const [visitCount, setVisitCount] = useState<number | null>(null)

  useEffect(() => {
    let isMounted = true

    async function trackVisit() {
      try {
        const response = await fetch("/api/profile-views", {
          method: "POST",
          cache: "no-store",
        })
        if (!response.ok) return
        const payload = (await response.json()) as { count?: number }
        if (isMounted && typeof payload.count === "number") {
          setVisitCount(payload.count)
        }
      } catch {
        // Profile tracking should never block the hero.
      }
    }

    trackVisit()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section id="hero" className="relative overflow-hidden border-b border-border/70 pb-20 pt-20 md:pt-24">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(236,253,245,0.95),_rgba(239,246,255,0.88)_45%,_rgba(255,247,237,0.78))] dark:bg-[linear-gradient(135deg,_rgba(8,13,24,0.98),_rgba(12,33,45,0.88)_52%,_rgba(23,23,23,0.9))]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div className="space-y-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-background/75 px-3 py-1 text-xs font-medium text-primary shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            AI, software, automation and backend services
          </div>

          <div className="space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
              {portfolio.profile.name}
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-foreground md:text-6xl">
              AI app development and software services for founders who need production-ready systems.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              I build custom AI applications, generative AI tools, RAG knowledge systems, AI chatbots,
              workflow automation, SaaS web apps, and scalable FastAPI backends.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href="#enquiry">
                Enquire Now
                <Send className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/resume.pdf" target="_blank">
                Resume
                <FileText className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="#services">
                Explore Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2" aria-label="Core service keywords">
            {proof.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="grid gap-3 sm:grid-cols-4">
            {stats.map((item) => (
              <div key={item.label} className="border-l border-primary/35 pl-3">
                <p className="text-lg font-semibold text-foreground">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative" data-story="hero-photo">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
            <Image
              src="/ai-chatbot-dashboard.png"
              alt="AI chatbot dashboard service preview"
              width={1536}
              height={864}
              priority
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="aspect-[16/10] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-8 left-5 right-5 rounded-xl border border-border bg-background/95 p-4 shadow-xl backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-foreground">Free project direction call</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Share your idea, current workflow, or product problem.
                </p>
              </div>
              <Link
                href="#enquiry"
                className="inline-flex shrink-0 items-center gap-2 rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground"
              >
                Start
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
          <div className="absolute right-4 top-4 rounded-full border border-border bg-background/90 px-3 py-1 text-xs text-muted-foreground shadow">
            visits: {visitCount === null ? "..." : visitCount.toLocaleString("en-US")}
          </div>
        </div>
      </div>
    </section>
  )
}
