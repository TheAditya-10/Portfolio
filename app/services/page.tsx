import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { AiChatWidget } from "@/components/ai-chat-widget"
import { LeadMagnetSection } from "@/components/lead-magnet-section"
import { serviceLandingDetails, servicePackages } from "@/lib/service-data"

export const metadata: Metadata = {
  title: "AI Development Services",
  description:
    "Custom AI development services for AI chatbots, RAG systems, LLM applications, workflow automation, SaaS products, FastAPI backends, and production deployment.",
  alternates: {
    canonical: "/services",
  },
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <section className="border-b border-border/70 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">AI Development Services</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-foreground md:text-6xl">
            Choose the AI or software service your business needs next.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
            Each service is structured around a business outcome: launch faster, reduce manual work,
            answer customer questions, organize company knowledge, or build a backend that can scale.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-6xl gap-5 px-6 md:grid-cols-2">
          {servicePackages.map((service) => {
            const Icon = service.icon
            const detail = serviceLandingDetails[service.slug]

            return (
              <article key={service.slug} className="rounded-xl border border-border bg-card/75 p-6 transition hover:-translate-y-1 hover:border-primary/50">
                <div className="flex items-start justify-between gap-4">
                  <div className="rounded-lg bg-primary/10 p-3 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-muted-foreground transition hover:border-primary/50 hover:text-foreground"
                  >
                    Explore
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <h2 className="mt-5 text-xl font-semibold text-foreground">{service.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{detail.hero}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {service.deliverables.map((item) => (
                    <span key={item} className="inline-flex items-center gap-2 rounded-md border border-border bg-background/70 px-2 py-1 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <LeadMagnetSection />
      <ContactSection />
      <Footer />
      <AiChatWidget />
    </main>
  )
}
