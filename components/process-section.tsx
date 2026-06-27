import { CheckCircle2 } from "lucide-react"
import portfolio from "@/data/portfolio.json"
import { processSteps, trustPoints } from "@/lib/service-data"

export function ProcessSection() {
  return (
    <section id="process" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">How Projects Run</p>
            <h2 className="mt-3 text-3xl font-semibold text-foreground md:text-4xl">
              Clear delivery from idea to deployed product.
            </h2>
            <p className="mt-4 text-muted-foreground">
              You get practical planning, visible milestones, and systems designed for real users,
              not only prototype screenshots.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {portfolio.profile.stats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-border bg-card/70 p-4">
                  <p className="text-xl font-semibold text-foreground">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {processSteps.map((step, index) => (
              <article key={step.title} className="rounded-xl border border-border bg-card/70 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
                  {index + 1}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {trustPoints.map((point) => {
            const Icon = point.icon

            return (
              <article key={point.title} className="rounded-xl border border-border bg-card/70 p-6">
                <Icon className="h-6 w-6 text-primary" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">{point.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{point.description}</p>
              </article>
            )
          })}
        </div>

        <div className="mt-12 rounded-xl border border-primary/25 bg-primary/10 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">Best fit projects</p>
              <p className="mt-1 text-sm text-muted-foreground">
                MVPs, internal tools, RAG assistants, AI automation, SaaS backends, dashboards, and AI feature integration.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              {["Fast delivery", "Clean architecture", "SMTP enquiry flow", "SEO schema"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-md bg-background/70 px-3 py-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
