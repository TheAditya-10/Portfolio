import { Navigation } from "@/components/navigation"
import { ExperienceSection } from "@/components/experience-section"
import { ServicesSection } from "@/components/services-section"
import { ResearchSection } from "@/components/research-section"
import { AchievementsSection } from "@/components/achievements-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { AiChatWidget } from "@/components/ai-chat-widget"

export default function ExperiencePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <ExperienceSection />
      <ServicesSection />
      <ResearchSection />
      <AchievementsSection />
      <ContactSection />
      <Footer />
      <AiChatWidget />
    </main>
  )
}
