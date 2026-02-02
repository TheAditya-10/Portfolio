import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ProjectsSection } from "@/components/projects-section"
import { ExperienceSection } from "@/components/experience-section"
import { SkillsSection } from "@/components/skills-section"
import { ResearchSection } from "@/components/research-section"
import { AchievementsSection } from "@/components/achievements-section"
import { ResumeTailorSection } from "@/components/resume-tailor-section"
import { InsightsSection } from "@/components/insights-section"
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
        variant="featured"
        title="Flagship AI Systems"
        subtitle="Recruiter-ready projects with measurable impact and deep technical notes."
      />
      <ExperienceSection />
      <SkillsSection />
      <ResearchSection />
      <AchievementsSection />
      <ResumeTailorSection />
      <ContactSection />
      <Footer />
      <AiChatWidget />
    </main>
  )
}
