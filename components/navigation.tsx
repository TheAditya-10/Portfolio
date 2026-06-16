"use client"

import { useState } from "react"
import Link from "next/link"
import { StoryMode } from "@/components/story-mode"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/about", label: "it's Aditya" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/skills", label: "Skills" },
  { href: "/resume", label: "Role_Compatibility" },
]

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-semibold tracking-wide">
          apst.me
        </Link>
        <div className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-border p-2 text-muted-foreground transition hover:text-foreground md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            <span className="sr-only">Toggle navigation</span>
            <svg
              viewBox="0 0 24 24"
              className={`h-5 w-5 ${mobileOpen ? "hidden" : "block"}`}
              aria-hidden="true"
            >
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <svg
              viewBox="0 0 24 24"
              className={`h-5 w-5 ${mobileOpen ? "block" : "hidden"}`}
              aria-hidden="true"
            >
              <path
                d="M6 6l12 12M18 6l-12 12"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <ThemeToggle />
          <StoryMode />
        </div>
      </div>
      {mobileOpen ? (
        <div
          id="mobile-navigation"
          className="border-t border-border bg-background/95 px-6 py-4 text-sm text-muted-foreground md:hidden"
        >
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </nav>
  )
}
