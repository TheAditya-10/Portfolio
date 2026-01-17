"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { BarChart3, Brain, Cpu, Database, Users, Rocket } from "lucide-react"

const services = [
  {
    icon: Brain,
    title: "Machine Learning Development",
    description:
      "End-to-end ML model development from data preprocessing to deployment. Specializing in deep learning, Transformers, and time-series analysis with production-grade code.",
  },
  {
    icon: BarChart3,
    title: "Data Analysis & Visualization",
    description:
      "Comprehensive data analysis pipelines using Python, Pandas, and advanced visualization tools. Transform raw data into actionable insights with compelling visual narratives.",
  },
  {
    icon: Cpu,
    title: "MLOps & Deployment",
    description:
      "Production-ready ML infrastructure with MLflow, Docker, Kubernetes, and CI/CD pipelines. Automated retraining, drift detection, and scalable model serving.",
  },
  {
    icon: Database,
    title: "AI-Powered Applications",
    description:
      "Building intelligent applications with LangChain, LangGraph, and LLMs. From AI agents to RAG systems, creating solutions that leverage cutting-edge AI capabilities.",
  },
  {
    icon: Users,
    title: "Technical Mentorship",
    description:
      "Guidance for students and developers in DSA, machine learning, and AI fundamentals. Workshop facilitation and hands-on training with practical projects.",
  },
  {
    icon: Rocket,
    title: "Full-Stack ML Solutions",
    description:
      "Complete ML solutions from frontend to backend using FastAPI, Flask, and modern frameworks. Integrating ML models into production-ready web applications.",
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
    <section ref={sectionRef} className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div
          className={cn(
            "text-center space-y-4 mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          <p className="text-primary font-mono text-sm tracking-wider">EXPERTISE</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive AI and ML services tailored to solve real-world problems with production-ready solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={cn(
                "group relative p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-500 overflow-hidden",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
            >
              {/* Hover effect background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <service.icon className="h-6 w-6" />
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
