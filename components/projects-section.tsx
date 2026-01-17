"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Github, ExternalLink, Folder } from "lucide-react"
import Link from "next/link"

const majorProjects = [
  {
    title: "ForesightX: The Future Has Signals. We Decode Them.",
    description:
      "Designed and deployed an end-to-end ML system for stock market forecasting using Python, PyTorch-based deep time-series models, and feature-engineered pipelines processing 1M+ data points. Built scalable training, evaluation, and deployment workflows with MLflow, Docker, Kubernetes, and Airflow, enabling automated retraining, drift detection, and 30% faster inference latency.",
    technologies: ["Python", "PyTorch", "MLflow", "DVC", "Docker", "Kubernetes", "FastAPI", "Transformers"],
    github: "https://github.com/TheAditya-10/ForesightX",
    date: "Dec 2025",
    featured: true,
  },
  {
    title: "Deep ECG Signal Analysis: Transformer-based Classification and Anomaly Detection",
    description:
      "Developed a transformer-based dual-model pipeline achieving ~91.3% F1 score for ECG anomaly detection and arrhythmia classification on MIT-BIH and PTB datasets. Engineered a scalable architecture with custom preprocessing and multi-label supervision enabling real-time inference at <150ms latency per ECG segment.",
    technologies: ["PyTorch", "SciPy", "NumPy", "WFDB", "Torch.nn", "Scikit-learn", "Pandas"],
    github: "https://github.com/TheAditya-10/ECG-Detection",
    date: "Feb 2025 - Present",
    featured: true,
  },
]

const hackathonProjects = [
  {
    title: "BinSavvy – Smart Waste Management System",
    description:
      "Built a drone-integrated garbage detection system with backend automation and YOLO-based image recognition to streamline waste collection.",
    github: "https://github.com/TheAditya-10/BinSavvy",
    date: "Feb 2025",
  },
  {
    title: "MargDarshak-Mitr – Railway Travel Assistant",
    description:
      "Developed a full-featured web app enabling live coach tracking, food discovery, and trip planning to elevate the train travel experience.",
    github: "https://github.com/TheAditya-10/MargDarshak-Mitr",
    date: "Feb 2025",
  },
  {
    title: "Student Lifestyle and Academic Performance Predictor",
    description:
      "Built an end-to-end data science pipeline to analyze student lifestyle data (2,000 records) and predict GPA & stress levels using feature engineering, preprocessing pipelines, cross-validation, and regression models.",
    github: "https://github.com/TheAditya-10/Student-Lifestyle",
    date: "Nov 2024",
  },
  {
    title: "Restaurant Data Analytics & Cuisine Popularity Prediction",
    description:
      "Built an end-to-end data science pipeline to preprocess and analyze 10,000+ rows of global restaurant data, perform feature engineering, and predict cuisine popularity using Random Forest and XGBoost, achieving ~92% accuracy.",
    github: "https://github.com/TheAditya-10/Restaurants-Data-Insights-",
    date: "Nov 2024",
  },
  {
    title: "Chess Game – Two-Player Board Game",
    description: "Created an interactive two-player chess game with intuitive controls and core game mechanics.",
    github: "https://scratch.mit.edu/projects/990205458/",
    date: "Feb 2024",
  },
]

export function ProjectsSection() {
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
    <section ref={sectionRef} id="projects" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div
          className={cn(
            "text-center space-y-4 mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          <p className="text-primary font-mono text-sm tracking-wider">PORTFOLIO</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            End-to-end ML systems, AI applications, and data-driven solutions built with production-grade standards.
          </p>
        </div>

        {/* Major Projects */}
        <div className="space-y-8 mb-16">
          {majorProjects.map((project, index) => (
            <div
              key={project.title}
              className={cn(
                "group relative p-8 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-500",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: isVisible ? `${index * 150}ms` : "0ms" }}
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 text-xs rounded-full bg-primary text-primary-foreground font-medium">
                      Featured
                    </span>
                    <span className="text-sm text-muted-foreground">{project.date}</span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 lg:flex-col">
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors text-sm font-medium"
                  >
                    <Github className="h-4 w-4" />
                    Code
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hackathon & Learning Projects */}
        <div
          className={cn(
            "space-y-6 transition-all duration-700 delay-300",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          <h3 className="text-xl font-semibold text-foreground mb-6">Hackathon & Learning Projects</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hackathonProjects.map((project, index) => (
              <div
                key={project.title}
                className={cn(
                  "group p-5 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                )}
                style={{ transitionDelay: isVisible ? `${(index + 2) * 100}ms` : "0ms" }}
              >
                <div className="flex items-start justify-between mb-3">
                  <Folder className="h-8 w-8 text-primary" />
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {project.github.includes("scratch") ? (
                      <ExternalLink className="h-5 w-5" />
                    ) : (
                      <Github className="h-5 w-5" />
                    )}
                  </Link>
                </div>

                <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {project.title}
                </h4>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{project.description}</p>

                <p className="text-xs text-muted-foreground">{project.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
