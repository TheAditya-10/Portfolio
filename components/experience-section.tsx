"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Briefcase, MapPin } from "lucide-react"

const experiences = [
  {
    company: "CatalyzeIQ Pvt. Ltd.",
    role: "Lead Engineer",
    type: "Hybrid",
    period: "Jan 2026 - Present",
    description: [
      "Designing core backend services and AI-driven workflow architecture, collaborating with founders to define scalable systems, automation pipelines, and product direction in a zero-to-one startup.",
    ],
    technologies: ["AI Architecture", "Backend Services", "Automation Pipelines"],
  },
  {
    company: "Suryavanshi Ventures Pvt. Ltd.",
    role: "AI Research Intern",
    type: "Hybrid",
    period: "Aug 2025 - Sep 2025",
    description: [
      "Engineered AI-driven health-care agents using LangGraph and LangChain, boosting startup's growth by 15-20%.",
      "Optimized backend workflows with FastAPI, SQLAlchemy & Poetry, cutting API latency by 20% and enhancing scalability.",
    ],
    technologies: ["LangGraph", "LangChain", "FastAPI", "SQLAlchemy", "Poetry"],
  },
  {
    company: "Priyam Innovations Pvt. Ltd.",
    role: "ML Intern",
    type: "Remote",
    period: "Jun 2025 - Jul 2025",
    description: [
      "Spearheaded the development of an AI-powered interview platform's MVP by engineering dynamic, context-aware question generation using GPT-3.5 based on resumes and job roles, improving question relevance by ~80% accuracy.",
      "Implemented multi-modal sentiment analysis on 100+ interview transcripts and real-time candidate video using OpenCV and HuggingFace Transformers to evaluate confidence, clarity, and behavioral anomalies with ~75% accuracy.",
    ],
    technologies: ["GPT-3.5", "OpenCV", "HuggingFace Transformers", "Sentiment Analysis"],
  },
]

export function ExperienceSection() {
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
    <section ref={sectionRef} id="experience" className="py-24 md:py-32 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-6">
        <div
          className={cn(
            "text-center space-y-4 mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          <p className="text-primary font-mono text-sm tracking-wider">CAREER</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Professional Experience</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Building AI-driven solutions and production-ready ML systems across startups and research labs.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.company}
                className={cn(
                  "relative grid md:grid-cols-2 gap-8 transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                )}
                style={{ transitionDelay: isVisible ? `${index * 150}ms` : "0ms" }}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 z-10" />

                {/* Content positioning based on index */}
                <div className={cn("md:pr-12 pl-8 md:pl-0", index % 2 === 0 ? "md:text-right" : "md:col-start-2")}>
                  <div
                    className={cn(
                      "p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300",
                      index % 2 === 0 ? "md:ml-auto" : "",
                    )}
                  >
                    <div className={cn("flex items-center gap-2 mb-2", index % 2 === 0 ? "md:justify-end" : "")}>
                      <Briefcase className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-primary">{exp.period}</span>
                    </div>

                    <h3 className="text-xl font-semibold text-foreground mb-1">{exp.role}</h3>
                    <div className={cn("flex items-center gap-2 mb-4", index % 2 === 0 ? "md:justify-end" : "")}>
                      <span className="text-muted-foreground">{exp.company}</span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {exp.type}
                      </span>
                    </div>

                    <ul className={cn("space-y-2 mb-4", index % 2 === 0 ? "md:text-right" : "")}>
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className={cn("flex flex-wrap gap-2", index % 2 === 0 ? "md:justify-end" : "")}>
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Empty column for alternating layout */}
                {index % 2 === 0 && <div className="hidden md:block" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
