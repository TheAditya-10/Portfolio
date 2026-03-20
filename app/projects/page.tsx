import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { AiChatWidget } from "@/components/ai-chat-widget"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects by Aditya Pratap Singh Tomar (APST): machine learning systems, software engineering builds, and production-ready case studies.",
  alternates: {
    canonical: "/projects",
  },
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <ProjectsSection
        variant="all"
        title="All Projects"
        subtitle="Complete project catalog with major builds, hackathon work, and learning projects."
        sectionId="projects-all"
      />
      <ContactSection />
      <Footer />
      <AiChatWidget />
    </main>
  )
}
