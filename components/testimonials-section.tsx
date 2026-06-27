import { CheckCircle2 } from "lucide-react"
import portfolio from "@/data/portfolio.json"
import { clientConfidencePoints } from "@/lib/service-data"

export function TestimonialsSection() {
  return (
    <section id="proof" className="border-y border-border/70 bg-secondary/35 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">Proof</p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground md:text-4xl">
            Signals you can trust before starting.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Before you invest in an AI developer, you need evidence that the work can move from idea
            to reliable software. These signals support the service offer without turning the page into a resume.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {clientConfidencePoints.map((item) => (
            <article key={item.title} className="rounded-xl border border-border bg-card/80 p-6">
              <CheckCircle2 className="h-6 w-6 text-primary" />
              <h3 className="mt-5 text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {portfolio.achievements.map((item) => (
            <article key={item.id} className="rounded-xl border border-border bg-card/80 p-5">
              <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
