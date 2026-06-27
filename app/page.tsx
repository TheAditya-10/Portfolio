import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { ProductShowcaseSection } from "@/components/product-showcase-section"
import { ProcessSection } from "@/components/process-section"
import { FounderSection } from "@/components/founder-section"
import { ProjectsSection } from "@/components/projects-section"
import { ExperienceSection } from "@/components/experience-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FAQSection } from "@/components/faq-section"
import { SocialsSection } from "@/components/socials-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { AiChatWidget } from "@/components/ai-chat-widget"
import { IntentTracker } from "@/components/intent-tracker"
import { OfferPopup } from "@/components/offer-popup"

export const metadata: Metadata = {
  title: "AI App Development & Software Services",
  description:
    "AI app development, generative AI development, chatbot development, RAG knowledge systems, workflow automation, SaaS web apps, and FastAPI backend services by Aditya Pratap Singh Tomar.",
  keywords: [
    "AI App Development",
    "Software Development Services",
    "Generative AI Development",
    "AI Chatbot Development",
    "RAG Knowledge Base",
    "AI Automation Services",
    "FastAPI Backend Development",
    "SaaS Development",
    "MVP Development",
    "AI Agent Development",
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
      <ProductShowcaseSection />
      <ProcessSection />
      <FounderSection />
      <TestimonialsSection />
      <ProjectsSection
        variant="flagship"
        title="Selected Builds Behind the Services"
        subtitle="Portfolio projects that show the engineering depth behind the AI, backend, and data services."
      />
      <ExperienceSection />
      <FAQSection />
      <ContactSection />
      <SocialsSection />
      <Footer />
      <AiChatWidget />
      <OfferPopup />
    </main>
  )
}
