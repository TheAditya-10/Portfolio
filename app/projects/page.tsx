import { Navigation } from "@/components/navigation"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { AiChatWidget } from "@/components/ai-chat-widget"

export default function ProjectsPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <ProjectsSection
        variant="featured"
        title="Flagship Projects"
        subtitle="Production-ready AI systems and research-backed deployments."
        sectionId="projects-featured"
      />
      <ProjectsSection
        variant="hackathon"
        title="Hackathons & Prototypes"
        subtitle="High-velocity builds that showcase experimentation and collaboration."
        sectionId="projects-hackathon"
      />
      <ProjectsSection
        variant="learning"
        title="Learning Builds"
        subtitle="Projects that sharpen data analysis and engineering fundamentals."
        sectionId="projects-learning"
      />
      <ContactSection />
      <Footer />
      <AiChatWidget />
    </main>
  )
}
