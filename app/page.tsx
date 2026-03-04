import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ProjectsSection } from "@/components/projects-section"
import { ExperienceSection } from "@/components/experience-section"
import { SkillsSection } from "@/components/skills-section"
import { AchievementsSection } from "@/components/achievements-section"
import { ResumeTailorSection } from "@/components/resume-tailor-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { AiChatWidget } from "@/components/ai-chat-widget"
import { IntentTracker } from "@/components/intent-tracker"

export default function Home() {
  return (
    <main className="min-h-screen">
      <IntentTracker />
      <Navigation />
      <HeroSection />
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
      <Footer />
      <AiChatWidget />
    </main>
  )
}
