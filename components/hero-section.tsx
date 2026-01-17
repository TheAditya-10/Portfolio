"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"
import { ArrowDown, Code2, Download, Github, Instagram, Linkedin, Mail, Twitter } from "lucide-react"
import Link from "next/link"

type QuickLink = {
  label: string
  href: string
  icon: LucideIcon
  external?: boolean
}

const quickGroups: { label: string; links: QuickLink[] }[] = [
  {
    label: "CODE",
    links: [
      { label: "GitHub", href: "https://github.com/TheAditya-10", icon: Github, external: true },
      { label: "LeetCode", href: "https://leetcode.com/TheAditya_10", icon: Code2, external: true },
    ],
  },
  {
    label: "SOCIAL",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/aditya-pratap-singh-tomar-693444204/", icon: Linkedin, external: true },
      { label: "Instagram", href: "https://www.instagram.com/theaditya.10/", icon: Instagram, external: true },
      { label: "X", href: "https://x.com/TheAditya_10", icon: Twitter, external: true },
    ],
  },
  {
    label: "CONNECT",
    links: [{ label: "Email", href: "mailto:aditya.pratap.singh.tomar.1082006@email.com", icon: Mail }],
  },
]

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX / innerWidth - 0.5) * 20
      const y = (clientY / innerHeight - 0.5) * 20
      heroRef.current.style.setProperty("--mouse-x", `${x}px`)
      heroRef.current.style.setProperty("--mouse-y", `${y}px`)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ "--mouse-x": "0px", "--mouse-y": "0px" } as React.CSSProperties}
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        style={{
          transform: "translate(var(--mouse-x), var(--mouse-y))",
          transition: "transform 0.3s ease-out",
        }}
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        style={{
          transform: "translate(calc(var(--mouse-x) * -1), calc(var(--mouse-y) * -1))",
          transition: "transform 0.3s ease-out",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-32 text-center md:text-left">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 md:order-1 space-y-6">
            <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <p className="text-primary font-mono text-sm tracking-wider">
                DATA SCIENTIST • ML ENGINEER • AI RESEARCHER
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                Aditya Pratap Singh Tomar
              </h1>
            </div>

            <p
              className="text-lg text-muted-foreground leading-relaxed max-w-xl animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Building production-ready ML systems with deep learning, Transformers, and scalable deployment. Passionate
              about solving real-world problems through AI-driven solutions.
            </p>

            <div
              className="flex flex-wrap gap-4 justify-center md:justify-start animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <Button asChild size="lg" className="gap-2">
                <Link href="#contact">
                  <Mail className="h-4 w-4" />
                  Contact Me
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="gap-2 bg-transparent">
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4" />
                  View Resume
                </a>
              </Button>
            </div>

            <div className="space-y-4 pt-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              {quickGroups.map((group) => (
                <div key={group.label} className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-mono tracking-[0.3em] text-muted-foreground">{group.label}</span>
                  <div className="flex flex-wrap gap-2">
                    {group.links.map((link) => {
                      const Icon = link.icon
                      return (
                        <Link
                          key={link.label}
                          href={link.href}
                          target={link.external ? "_blank" : undefined}
                          rel={link.external ? "noopener noreferrer" : undefined}
                          className="group inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-primary/40 hover:bg-secondary/70 hover:text-foreground"
                        >
                          <Icon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground" />
                          {link.label}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Image */}
          <div className="order-1 md:order-2 flex justify-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full blur-2xl scale-110" />
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 glass">
                <img
                  src="/professional-portrait-of-a-young-indian-male-data-.jpg"
                  alt="Aditya Pratap Singh Tomar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowDown className="h-6 w-6" />
            <span className="sr-only">Scroll to content</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
