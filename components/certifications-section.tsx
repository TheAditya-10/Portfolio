"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Award, ExternalLink } from "lucide-react"
import Link from "next/link"

const certifications = [
  {
    title: "Getting Started with Competitive Programming",
    issuer: "NPTEL",
    date: "May 2025",
    link: "https://internalapp.nptel.ac.in/NOC/NOC25/SEM2/Ecertificates/106/noc25-cs97/Course/NPTEL25CS97S55760019510336248.pdf",
  },
  {
    title: "Natural Language Processing",
    issuer: "NPTEL",
    date: "May 2025",
    link: "https://nptel.ac.in/noc/E_Certificate/NPTEL25CS51S34730010904397038",
  },
  {
    title: "Data Science",
    issuer: "INI (IIT Madras)",
    date: "Dec 2024",
    link: "https://onlinecourses.swayam2.ac.in/ini24_cs02/certificate?q=tDcXbu338Ulq%2BuKHbzFmFlaT9X49qijoWcQJjGLkHkiGof9MaPFyhUU9OPnyBHw8",
  },
  {
    title: "CS50x",
    issuer: "Harvard University",
    date: "Nov 2024",
    link: "https://cs50.harvard.edu/certificates/470bdfbf-9c89-498d-9fcc-cbc2106c7d3c",
  },
  {
    title: "Ethical Hacking",
    issuer: "NPTEL",
    date: "Dec 2024",
    link: "https://archive.nptel.ac.in/noc/Ecertificate/?q=NPTEL24CS94S45550049704445132",
  },
]

export function CertificationsSection() {
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
    <section ref={sectionRef} className="py-24 md:py-32 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-6">
        <div
          className={cn(
            "text-center space-y-4 mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          <p className="text-primary font-mono text-sm tracking-wider">CREDENTIALS</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Courses & Certifications</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Continuous learning through prestigious institutions and platforms.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, index) => (
            <Link
              key={cert.title}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group p-5 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: isVisible ? `${index * 75}ms` : "0ms" }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Award className="h-5 w-5" />
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>

              <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2">
                {cert.title}
              </h3>
              <p className="text-sm text-primary font-medium mb-1">{cert.issuer}</p>
              <p className="text-xs text-muted-foreground">{cert.date}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
