import { whyWorkWithMe } from "@/lib/service-data"

export function WhyWorkSection() {
  return (
    <section id="why-work" className="border-y border-border/70 bg-secondary/35 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">Why Work With Me</p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground md:text-4xl">
            Less hiring risk. More useful software.
          </h2>
          <p className="mt-4 text-muted-foreground">
            You need an AI Consultant and Python backend developer who can think through the product,
            not just connect an API and disappear.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {whyWorkWithMe.map((item) => {
            const Icon = item.icon

            return (
              <article key={item.title} className="rounded-xl border border-border bg-card/80 p-6">
                <Icon className="h-6 w-6 text-primary" />
                <h3 className="mt-5 text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
