"use client"

import { useState } from "react"
import Link from "next/link"
import { FileText, Menu, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  { href: "/#services", label: "Services" },
  { href: "/#solutions", label: "AI Apps" },
  { href: "/#process", label: "Process" },
  { href: "/#founder", label: "Founder" },
  { href: "/#proof", label: "Proof" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
]

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-background/82 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <Link href="/" className="text-sm font-semibold tracking-wide text-foreground">
          apst.me
        </Link>

        <div className="hidden items-center gap-5 text-sm text-muted-foreground lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
            <Link href="/resume.pdf" target="_blank">
              <FileText className="h-4 w-4" />
              Resume
            </Link>
          </Button>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/#enquiry">
              <Send className="h-4 w-4" />
              Enquire
            </Link>
          </Button>
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-border p-2 text-muted-foreground transition hover:text-foreground lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div
          id="mobile-navigation"
          className="border-t border-border bg-background/96 px-6 py-4 text-sm text-muted-foreground lg:hidden"
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
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/resume.pdf" target="_blank" onClick={() => setMobileOpen(false)}>
                  <FileText className="h-4 w-4" />
                  Resume
                </Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/#enquiry" onClick={() => setMobileOpen(false)}>
                  <Send className="h-4 w-4" />
                  Enquire
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  )
}
