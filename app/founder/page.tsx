import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { FounderSection } from "@/components/founder-section"
import { AchievementsSection } from "@/components/achievements-section"
import { ActivitySection } from "@/components/activity-section"
import { EducationSection } from "@/components/education-section"
import { CertificationsSection } from "@/components/certifications-section"
import { LeadershipSection } from "@/components/leadership-section"
import { SocialsSection } from "@/components/socials-section"
import { Footer } from "@/components/footer"
import { AiChatWidget } from "@/components/ai-chat-widget"

export const metadata: Metadata = {
  title: "About the Founder",
  description:
    "About Aditya Pratap Singh Tomar, founder of APST AI & Software Services: achievements, daily GitHub and LeetCode activity, education, certifications, and leadership.",
  alternates: {
    canonical: "/founder",
  },
}

export default function FounderPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <FounderSection />
      <AchievementsSection />
      <ActivitySection />
      <EducationSection />
      <CertificationsSection />
      <LeadershipSection />
      <SocialsSection />
      <Footer />
      <AiChatWidget />
    </main>
  )
}
