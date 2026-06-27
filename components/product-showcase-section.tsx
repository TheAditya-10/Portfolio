import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { productVisuals } from "@/lib/service-data"

export function ProductShowcaseSection() {
  return (
    <section id="solutions" className="border-y border-border/70 bg-secondary/35 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">AI App Ideas</p>
            <h2 className="mt-3 text-3xl font-semibold text-foreground md:text-4xl">
              Examples of the kind of AI products you can launch.
            </h2>
            <p className="mt-4 text-muted-foreground">
              These visuals show common client needs: support automation, internal workflow agents,
              and private knowledge search.
            </p>
          </div>
          <Link
            href="#enquiry"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/50"
          >
            Discuss a build
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 space-y-8">
          {productVisuals.map((item, index) => (
            <article
              key={item.title}
              className="grid overflow-hidden rounded-xl border border-border bg-card/80 shadow-lg md:grid-cols-[1.1fr_0.9fr]"
            >
              <div className={index % 2 === 1 ? "md:order-2" : ""}>
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={1536}
                  height={864}
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className="aspect-[16/10] h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-6 md:p-8">
                <h3 className="text-2xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{item.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-md border border-border bg-background/70 px-3 py-1 text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
