"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import portfolio from "@/data/portfolio.json"

export function AboutSection() {
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
    <section ref={sectionRef} id="about" className="py-24 md:py-32 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div
            className={cn(
              "relative transition-all duration-700",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10",
            )}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur-xl" />
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border">
                <img
                  src="/professional-portrait-indian-computer-science.jpg"
                  alt="Aditya working on ML projects"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            className={cn(
              "space-y-6 transition-all duration-700 delay-200",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10",
            )}
          >
            <div className="space-y-2">
              <p className="text-primary font-mono text-sm tracking-wider">ABOUT ME</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Building AI systems recruiters can trust
              </h2>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm a <span className="text-foreground font-medium">Data Scientist and MLOps Engineer</span> focused on
                production-ready ML systems. My expertise spans data pipelines, deep learning (Transformers, LLMs),
                evaluation, and scalable deployment.
              </p>
              <p>
                Currently pursuing my{" "}
                <span className="text-foreground font-medium">B.Tech in Computer Science Engineering</span> at Jabalpur
                Engineering College, I combine academic rigor with hands-on industry delivery.
              </p>
              <p>
                I care about reliability, clear communication, and measurable outcomes when building AI-driven
                solutions.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4">
              {portfolio.profile.stats.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <p className="text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
