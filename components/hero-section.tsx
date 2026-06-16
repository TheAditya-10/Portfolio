"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Check, Github, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import portfolio from "@/data/portfolio.json"

const TERMINAL_LINES = [
  "$ role --current",
  "AI & Backend Developer",
  "$ services --focus",
  "Generative AI apps, FastAPI backends, RAG systems, and workflow automation",
  "$ availability",
  "Available for freelance projects",
]

const TRUST_INDICATORS = ["AI Solutions", "FastAPI Development", "RAG Systems", "Automation"]

export function HeroSection() {
  const [typed, setTyped] = useState("")
  const [lineIndex, setLineIndex] = useState(0)
  const [visitCount, setVisitCount] = useState<number | null>(null)

  useEffect(() => {
    if (lineIndex >= TERMINAL_LINES.length) return
    const currentLine = TERMINAL_LINES[lineIndex]
    let charIndex = 0

    const interval = window.setInterval(() => {
      charIndex += 1
      setTyped((prev) => prev + currentLine[charIndex - 1])
      if (charIndex >= currentLine.length) {
        window.clearInterval(interval)
        setTyped((prev) => prev + "\n")
        setLineIndex((prev) => prev + 1)
      }
    }, 20)

    return () => window.clearInterval(interval)
  }, [lineIndex])

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
        // Fail silently so the hero never breaks if the view API is unavailable.
      }
    }

    trackVisit()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section id="hero" className="relative overflow-hidden pb-24 pt-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.18),_transparent_62%)] dark:bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.15),_transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(236,253,255,0.94),_rgba(239,246,255,0.9))] dark:bg-[linear-gradient(120deg,_rgba(15,23,42,0.9),_rgba(2,6,23,0.6))]" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <span aria-hidden="true" className="mr-2">
              🟢
            </span>
            Available for Freelance Projects
          </div>
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-[0.35em] text-muted-foreground">
              {portfolio.profile.name}
            </p>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              AI &amp; Backend Developer
            </h1>
          </div>
          <p className="max-w-2xl text-lg text-muted-foreground">
            I help startups and businesses build AI-powered products, scalable backend systems,
            and intelligent automation solutions.
          </p>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Specializing in AI Chatbots, RAG Systems, FastAPI Backends, Workflow Automation, and
            Custom AI Applications.
          </p>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Freelance AI developer and FastAPI developer for founders building generative AI
            products, AI automation workflows, and production-ready RAG systems.
          </p>
          <p data-story="dominant-text" className="text-sm font-semibold text-primary/90">
            Built for startups that need reliable execution, clean architecture, and fast iteration.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button asChild>
              <Link href="#contact">
                Hire Me
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="#projects">View Projects</Link>
            </Button>
          </div>

          <ul className="flex flex-wrap gap-3 text-sm text-muted-foreground" aria-label="Core services">
            {TRUST_INDICATORS.map((indicator) => (
              <li
                key={indicator}
                className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/60 px-3 py-1"
              >
                <Check className="h-4 w-4 text-primary" aria-hidden="true" />
                <span>{indicator}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href={portfolio.profile.socials.linkedin} target="_blank">
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link href={portfolio.profile.socials.github} target="_blank">
              <Github className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <div
            data-story="hero-photo"
            className="overflow-hidden rounded-2xl border border-border bg-card/80 shadow-1xl"
          >
            <Image
              src="/aditya-pratap-singh-tomar-portrait.jpeg"
              alt="Aditya Pratap Singh Tomar portrait"
              width={720}
              height={420}
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-10 max-w-6xl px-6">
        <div className="rounded-2xl border border-border/80 bg-background/90 p-6 font-mono text-sm text-foreground/90 shadow-2xl dark:bg-black/60 dark:text-green-200">
          <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-red-400" />
            <span className="h-2 w-2 rounded-full bg-yellow-400" />
            <span className="h-2 w-2 rounded-full bg-green-400" />
            Terminal
          </div>
          <pre className="min-h-[180px] whitespace-pre-wrap">{typed}</pre>
          <span className="animate-pulse">▌</span>
          <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground/80">
            <span></span>
            <span className="rounded-full border border-border/60 px-2 py-0.5 text-primary/90">
              profile visits: {visitCount === null ? "..." : visitCount.toLocaleString("en-US")}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
