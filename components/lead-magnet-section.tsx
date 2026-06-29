import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { leadMagnet } from "@/lib/service-data"

export function LeadMagnetSection() {
  return (
    <section className="border-y border-border/70 bg-secondary/35 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 rounded-xl border border-primary/25 bg-background/75 p-6 shadow-xl md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">{leadMagnet.eyebrow}</p>
            <h2 className="mt-3 text-2xl font-semibold text-foreground md:text-3xl">{leadMagnet.title}</h2>
            <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">{leadMagnet.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {leadMagnet.bullets.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-card/70 px-3 py-2 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  {item}
                </span>
              ))}
            </div>
          </div>
          <Link
            href="/#enquiry"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            Claim the Audit
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
