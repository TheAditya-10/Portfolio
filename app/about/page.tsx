import { Navigation } from "@/components/navigation"
import { AboutSection } from "@/components/about-section"
import { ActivitySection } from "@/components/activity-section"
import { EducationSection } from "@/components/education-section"
import { CertificationsSection } from "@/components/certifications-section"
import { LeadershipSection } from "@/components/leadership-section"
import { SocialsSection } from "@/components/socials-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { AiChatWidget } from "@/components/ai-chat-widget"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <AboutSection />
      <ActivitySection />
      <EducationSection />
      <CertificationsSection />
      <LeadershipSection />
      <SocialsSection />
      <ContactSection />
      <Footer />
      <AiChatWidget />
    </main>
  )
}
