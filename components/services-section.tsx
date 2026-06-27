import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { servicePackages } from "@/lib/service-data"

export function ServicesSection() {
  return (
    <section id="services" className="py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">Services</p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground md:text-4xl">
            Software and AI services built around business outcomes.
          </h2>
          <p className="mt-4 text-muted-foreground">
            The offer is service-first, but backed by hands-on product engineering, AI research,
            backend architecture, and deployment experience.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {servicePackages.map((service) => {
            const Icon = service.icon

            return (
              <article
                key={service.title}
                className="group flex min-h-[330px] flex-col rounded-xl border border-border bg-card/75 p-5 transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="rounded-lg bg-primary/10 p-3 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <Link
                    href="#enquiry"
                    className="rounded-md border border-border p-2 text-muted-foreground transition hover:border-primary/50 hover:text-primary"
                    aria-label={`Enquire about ${service.title}`}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">{service.title}</h3>
                <p className="mt-1 text-xs leading-5 text-primary/90">{service.keywords}</p>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{service.description}</p>
                <div className="mt-auto pt-5">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Includes
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {service.deliverables.map((deliverable) => (
                      <span
                        key={deliverable}
                        className="rounded-md border border-border bg-background/70 px-2 py-1 text-xs text-muted-foreground"
                      >
                        {deliverable}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
