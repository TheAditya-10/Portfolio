import { Navigation } from "@/components/navigation"
import { SkillsSection } from "@/components/skills-section"
import { TechnicalSkillsSection } from "@/components/technical-skills-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { AiChatWidget } from "@/components/ai-chat-widget"

export default function SkillsPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <SkillsSection />
      <TechnicalSkillsSection />
      <ContactSection />
      <Footer />
      <AiChatWidget />
    </main>
  )
}
