"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Code2, Database, Brain, Cloud, Boxes, Wrench } from "lucide-react"

const skillCategories = [
  {
    title: "Programming Languages",
    icon: Code2,
    skills: ["Python", "Java", "C", "HTML", "CSS"],
  },
  {
    title: "Data Science & ML",
    icon: Brain,
    skills: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Scikit-Learn", "TensorFlow", "Keras", "PyTorch"],
  },
  {
    title: "MLOps & Cloud",
    icon: Cloud,
    skills: ["MLflow", "DVC", "AWS", "Azure", "Docker", "Kubernetes", "Prometheus", "Grafana"],
  },
  {
    title: "GenAI & Development",
    icon: Boxes,
    skills: ["LangChain", "LangGraph", "Flask", "FastAPI"],
  },
  {
    title: "Databases & Tools",
    icon: Database,
    skills: ["SQLAlchemy", "Poetry", "Git", "GitHub", "Postman"],
  },
  {
    title: "Other Tools",
    icon: Wrench,
    skills: ["Notion", "Canva", "Premiere Pro"],
  },
]

export function SkillsSection() {
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
    <section ref={sectionRef} id="skills" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div
          className={cn(
            "text-center space-y-4 mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          <p className="text-primary font-mono text-sm tracking-wider">EXPERTISE</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Technical Skills</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit built through hands-on experience in data science, machine learning, and
            production-grade MLOps systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className={cn(
                "group p-6 rounded-xl border border-border bg-card hover:bg-secondary/50 transition-all duration-500 hover:border-primary/50",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <category.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-foreground">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                  >
                    {skill}
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
