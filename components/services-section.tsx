"use client"

import { useEffect, useRef, useState } from "react"
import { Bot, Database, Server, Workflow } from "lucide-react"
import { cn } from "@/lib/utils"

const services = [
  {
    title: "AI Chatbot Development",
    description:
      "Build intelligent AI assistants powered by modern LLMs for customer support, internal tools, and knowledge systems.",
    icon: Bot,
  },
  {
    title: "RAG & Knowledge Systems",
    description:
      "Create searchable documentation and AI-powered knowledge bases using Retrieval-Augmented Generation.",
    icon: Database,
  },
  {
    title: "Backend Development",
    description:
      "Develop scalable APIs, authentication systems, database architectures, and backend services.",
    icon: Server,
  },
  {
    title: "AI Automation Solutions",
    description:
      "Automate repetitive workflows, reporting, document processing, and business operations.",
    icon: Workflow,
  },
]

export function ServicesSection() {
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
    <section id="services" ref={sectionRef} className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div
          className={cn(
            "mb-16 space-y-4 text-center transition-all duration-700",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
          )}
        >
          <p className="font-mono text-sm tracking-wider text-primary">SERVICES</p>
          <h2 className="text-3xl font-semibold text-foreground md:text-4xl">Services</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Solutions I provide for startups, businesses, and founders.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon

            return (
              <article
                key={service.title}
                className={cn(
                  "group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50",
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
                )}
                style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative">
                  <div className="mb-4 w-fit rounded-xl bg-primary/10 p-3 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mb-2 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                    {service.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
