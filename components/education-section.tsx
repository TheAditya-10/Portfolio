"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { GraduationCap, Calendar, Award } from "lucide-react"

const education = [
  {
    degree: "Bachelor of Technology",
    field: "Computer Science Engineering",
    institution: "Jabalpur Engineering College",
    period: "Sep 2023 - Apr 2027",
    score: "8.39/10.0 CGPA",
    highlights: ["Data Science", "Machine Learning", "Deep Learning", "MLOps"],
  },
  {
    degree: "Senior Secondary (XII)",
    field: "Science Stream",
    institution: "CBSE Board",
    period: "2023",
    score: "83.4%",
    highlights: ["Physics", "Chemistry", "Mathematics", "Computer Science"],
  },
  {
    degree: "Secondary (X)",
    field: "General Studies",
    institution: "CBSE Board",
    period: "2021",
    score: "93%",
    highlights: ["Science", "Mathematics", "English", "Social Studies"],
  },
]

export function EducationSection() {
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
    <section ref={sectionRef} id="education" className="py-24 md:py-32 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-6">
        <div
          className={cn(
            "text-center space-y-4 mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          <p className="text-primary font-mono text-sm tracking-wider">ACADEMICS</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Education</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A strong academic foundation in computer science and engineering.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {education.map((edu, index) => (
            <div
              key={edu.degree}
              className={cn(
                "group relative p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-500",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
            >
              {/* Accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {edu.period}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-1">{edu.degree}</h3>
              <p className="text-primary font-medium mb-2">{edu.field}</p>
              <p className="text-sm text-muted-foreground mb-4">{edu.institution}</p>

              <div className="flex items-center gap-2 mb-4 p-2 rounded-lg bg-primary/5">
                <Award className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">{edu.score}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {edu.highlights.map((highlight) => (
                  <span key={highlight} className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground">
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
