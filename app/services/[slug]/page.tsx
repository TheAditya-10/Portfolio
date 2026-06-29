import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { AiChatWidget } from "@/components/ai-chat-widget"
import { LeadMagnetSection } from "@/components/lead-magnet-section"
import {
  getServiceLandingDetail,
  getServicePackageBySlug,
  serviceLandingDetails,
  servicePackages,
} from "@/lib/service-data"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return servicePackages.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getServicePackageBySlug(slug)
  const detail = getServiceLandingDetail(slug)

  if (!service || !detail) {
    return {
      title: "Service",
    }
  }

  return {
    title: service.title,
    description: `${service.title}: ${detail.hero}`,
    keywords: service.keywords.split(",").map((keyword) => keyword.trim()),
    alternates: {
      canonical: `/services/${service.slug}`,
    },
  }
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params
  const service = getServicePackageBySlug(slug)
  const detail = getServiceLandingDetail(slug)

  if (!service || !detail) notFound()

  const Icon = service.icon
  const relatedServices = servicePackages.filter((item) => item.slug !== service.slug).slice(0, 3)

  return (
    <main className="min-h-screen">
      <Navigation />
      <section className="border-b border-border/70 py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">{service.keywords}</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-foreground md:text-6xl">{service.title}</h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">{detail.hero}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/#enquiry"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
              >
                Start This Project
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/#projects"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-medium text-foreground transition hover:border-primary/50"
              >
                View Similar Work
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card/75 p-6 shadow-xl">
            <div className="rounded-lg bg-primary/10 p-3 text-primary">
              <Icon className="h-7 w-7" />
            </div>
            <p className="mt-6 text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground">
              Client question
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-foreground">{detail.clientQuestion}</h2>
            <div className="mt-6 grid gap-2">
              {service.deliverables.map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-md border border-border bg-background/70 px-3 py-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 lg:grid-cols-3">
          <ServiceColumn title="The problem this solves" items={detail.painPoints} />
          <ServiceColumn title="What you get" items={detail.outcomes} />
          <ServiceColumn title="Delivery includes" items={detail.delivery} />
        </div>
      </section>

      <section className="border-y border-border/70 bg-secondary/35 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">Best Fit</p>
              <h2 className="mt-3 text-3xl font-semibold text-foreground">When this service makes sense.</h2>
              <p className="mt-4 text-muted-foreground">
                The strongest projects start with one painful workflow, one clear user group, and a first version
                that can create value quickly.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {detail.bestFor.map((item) => (
                <article key={item} className="rounded-xl border border-border bg-card/80 p-5">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <h3 className="mt-4 font-semibold text-foreground">{item}</h3>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">Related Services</p>
              <h2 className="mt-3 text-3xl font-semibold text-foreground">Other ways I can help.</h2>
            </div>
            <Link href="/services" className="hidden text-sm font-medium text-primary md:inline-flex">
              View all services
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {relatedServices.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="rounded-xl border border-border bg-card/75 p-5 transition hover:-translate-y-1 hover:border-primary/50"
              >
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{serviceLandingDetails[item.slug].hero}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LeadMagnetSection />
      <ContactSection />
      <Footer />
      <AiChatWidget />
    </main>
  )
}

function ServiceColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-xl border border-border bg-card/75 p-6">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <div key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
            <p>{item}</p>
          </div>
        ))}
      </div>
    </article>
  )
}
