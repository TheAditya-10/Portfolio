"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import portfolio from "@/data/portfolio.json"

const TERMINAL_LINES = [
  "$ whoami",
  "Aditya Pratap Singh Tomar",
  "> ML Engineer | Data Scientist | AI Researcher",
  "$ focus --current",
  "Production AI systems, RAG, healthcare ML, safety tooling",
]

export function HeroSection() {
  const [typed, setTyped] = useState("")
  const [lineIndex, setLineIndex] = useState(0)
  const [visitCount, setVisitCount] = useState(0)

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
    if (typeof window === "undefined") return
    const key = "portfolio:visit-count"
    const raw = window.localStorage.getItem(key)
    const current = raw ? Number.parseInt(raw, 10) || 0 : 0
    const next = current + 1
    window.localStorage.setItem(key, String(next))
    setVisitCount(next)
  }, [])

  return (
    <section id="hero" className="relative overflow-hidden pb-24 pt-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.15),_transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(15,23,42,0.9),_rgba(2,6,23,0.6))]" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
          <p className="text-xs font-mono uppercase tracking-[0.35em] text-muted-foreground">
            AI-Native Portfolio
          </p>
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
            {portfolio.profile.name}
          </h1>
          <p className="text-lg text-muted-foreground">{portfolio.profile.headline}</p>
          <p className="text-sm text-muted-foreground">{portfolio.profile.title}</p>
          <p data-story="dominant-text" className="text-sm font-semibold text-primary/90">
            Dominant in delivery. Precise in execution. Reliable in production.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button asChild>
              <Link href="#projects">
                View Flagship Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <a href={`mailto:${portfolio.profile.email}`}>
                <Mail className="mr-2 h-4 w-4" />
                Contact
              </a>
            </Button>
            <Button variant="secondary" asChild>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                View Resume
              </a>
            </Button>
          </div>

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
            className="overflow-hidden rounded-2xl border border-border bg-card/80 shadow-2xl"
          >
            <img
              src="/professional-portrait-of-a-young-indian-male-data-.jpg"
              alt="Aditya Pratap Singh Tomar"
              className="h-72 w-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-10 max-w-6xl px-6">
        <div className="rounded-2xl border border-border bg-black/60 p-6 font-mono text-sm text-green-200 shadow-2xl">
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
              profile visits: {visitCount}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
