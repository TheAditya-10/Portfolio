"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Trophy, Medal, Code } from "lucide-react"
import Link from "next/link"

const achievements = [
  {
    icon: Trophy,
    title: "SIH'24 Finalists",
    description: "Smart India Hackathon 2024 - Problem Statement PS-25189",
    highlight: "National Level",
  },
  {
    icon: Medal,
    title: "Kaggle Rank 196",
    description: "Top ~1.7% among 11,450 participants in Kaggle Playground Series S5E11",
    highlight: "Top 1.7%",
  },
  {
    icon: Trophy,
    title: "HackCrux Runner-up",
    description: "National-level hackathon organized by LNMIIT Jaipur",
    highlight: "2nd Place",
  },
  {
    icon: Code,
    title: "350+ DSA Problems",
    description: "Solved across platforms and earned the GFG Bag by completing the GFG160 Challenge",
    highlight: "GFG160 Badge",
    link: "https://media.geeksforgeeks.org/courses/certificates/3b5d57525b2cf64911b4815a5259e875.pdf",
  },
]

export function AchievementsSection() {
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
          <p className="text-primary font-mono text-sm tracking-wider">RECOGNITION</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Achievements</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Milestones and recognitions earned through competitive programming, hackathons, and technical excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.title}
              className={cn(
                "group relative p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-500 overflow-hidden",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
            >
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />

              <div className="relative flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <achievement.icon className="h-6 w-6" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{achievement.title}</h3>
                    <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary font-medium">
                      {achievement.highlight}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  {achievement.link && (
                    <Link
                      href={achievement.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-sm text-primary hover:underline"
                    >
                      View Certificate
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
