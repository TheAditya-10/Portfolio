import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { WhyWorkSection } from "@/components/why-work-section"
import { ProductShowcaseSection } from "@/components/product-showcase-section"
import { ProcessSection } from "@/components/process-section"
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
  title: "AI Consultant & Custom AI Development Services",
  description:
    "Hire an AI Consultant, Generative AI Developer, FastAPI Developer, and Python Backend Developer for custom AI development, LLM applications, RAG systems, AI chatbot development, automation, and SaaS products.",
  keywords: [
    "AI Consultant",
    "AI Developer",
    "AI App Development",
    "Custom AI Development",
    "Software Development Services",
    "LLM Applications",
    "Generative AI Development",
    "Generative AI Developer",
    "AI Chatbot Development",
    "AI Automation",
    "RAG Knowledge Base",
    "RAG Systems",
    "AI Automation Services",
    "FastAPI Backend Development",
    "FastAPI Developer",
    "Python Backend Developer",
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
      <WhyWorkSection />
      <ProjectsSection
        variant="flagship"
        title="Client Success Stories"
        subtitle="Business problems solved with custom AI development, RAG systems, automation, and backend engineering."
      />
      <ProductShowcaseSection />
      <ProcessSection />
      <ExperienceSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <SocialsSection />
      <Footer />
      <AiChatWidget />
      <OfferPopup />
    </main>
  )
}
