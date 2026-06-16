import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { ProjectsSection } from "@/components/projects-section"
import { ExperienceSection } from "@/components/experience-section"
import { SkillsSection } from "@/components/skills-section"
import { AchievementsSection } from "@/components/achievements-section"
import { ResumeTailorSection } from "@/components/resume-tailor-section"
import { SocialsSection } from "@/components/socials-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { AiChatWidget } from "@/components/ai-chat-widget"
import { IntentTracker } from "@/components/intent-tracker"

export const metadata: Metadata = {
  title: "AI & Backend Developer for Startups",
  description:
    "Freelance AI developer and FastAPI developer building generative AI products, scalable backend systems, RAG systems, and AI automation solutions for startups and businesses.",
  keywords: [
    "AI Developer",
    "Generative AI Developer",
    "FastAPI Developer",
    "AI Automation",
    "RAG Systems",
    "Backend Developer for Startups",
  ],
  alternates: {
    canonical: "/",
  },
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <IntentTracker />
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <ProjectsSection
        variant="flagship"
        title="Flagship Projects"
        subtitle="My strongest software engineering and data science builds, with measurable outcomes."
      />
      <ExperienceSection />
      <SkillsSection />
      <AchievementsSection />
      <ResumeTailorSection />
      <ContactSection />
      <SocialsSection />
      <Footer />
      <AiChatWidget />
    </main>
  )
}
