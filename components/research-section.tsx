import researchData from "@/data/content/research/research.json"
import type { ResearchItem } from "@/lib/content"

const research = researchData as ResearchItem[]

export function ResearchSection() {
  if (research.length === 0) return null

  return (
    <section id="research" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">Research</p>
          <h2 className="mt-3 text-3xl font-semibold">Research and experimentation</h2>
          <p className="mt-2 text-muted-foreground">Evidence-backed studies on reliability, evaluation, and practical AI.</p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {research.map((item) => (
            <article key={item.id} className="rounded-2xl border border-border bg-card/70 p-6">
              <p className="text-xs text-muted-foreground">{item.area}</p>
              <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.summary}</p>
              <span className="mt-4 inline-flex rounded-full border border-border px-2 py-1 text-xs text-muted-foreground">
                {item.year}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
