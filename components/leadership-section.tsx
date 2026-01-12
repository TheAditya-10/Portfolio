"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Users, Calendar, ExternalLink } from "lucide-react"
import Link from "next/link"

const leadership = [
  {
    role: "Tech-Team Lead",
    organization: "MATRIX, JEC",
    period: "Jun 2024 - Present",
    description:
      "Led and executed Winter-Arc month long event, mentoring a 50+ member student team to build the platform, run campaigns, secure sponsorships, and drive 400+ participants through a structured, AI-powered learning ecosystem.",
    links: [
      { label: "View Team", url: "https://www.matrixjec.co.in/humans" },
      { label: "Instagram", url: "https://www.instagram.com/matrix.jec/" },
    ],
    highlights: ["50+ Team Members", "400+ Participants", "AI-Powered Learning"],
  },
  {
    role: "Technical Member",
    organization: "JLUG, JEC",
    period: "Oct 2024 - Present",
    description:
      "Delivered a technical seminar for 100+ students on Data Structures & Algorithms (DSA) for student developers, while mentoring juniors and engaging a coding community.",
    links: [
      {
        label: "View Post",
        url: "https://www.linkedin.com/posts/aditya-pratap-singh-tomar-693444204_jlug-dsa-codingcommunity-activity-7384216866296229888-DCN3/",
      },
      { label: "Instagram", url: "https://www.instagram.com/p/DMKHlp6TLZx/" },
    ],
    highlights: ["100+ Students", "DSA Workshop", "Community Mentor"],
  },
]

export function LeadershipSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="leadership" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div
          className={cn(
            "text-center space-y-4 mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          <p className="text-primary font-mono text-sm tracking-wider">COMMUNITY</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Club Activities & Leadership</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Building communities, mentoring developers, and leading technical initiatives that make an impact.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {leadership.map((item, index) => (
            <div
              key={item.role}
              className={cn(
                "group relative p-8 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-500",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: isVisible ? `${index * 150}ms` : "0ms" }}
            >
              {/* Decorative accent */}
              <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    <Users className="h-6 w-6" />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {item.period}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">{item.role}</h3>
                  <p className="text-primary font-medium">{item.organization}</p>
                </div>

                <p className="text-muted-foreground leading-relaxed">{item.description}</p>

                <div className="flex flex-wrap gap-2">
                  {item.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary font-medium"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  {item.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
