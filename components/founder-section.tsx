import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BriefcaseBusiness, GraduationCap, Trophy } from "lucide-react"
import portfolio from "@/data/portfolio.json"

export function FounderSection() {
  const education = portfolio.education[0]
  const topExperience = portfolio.experience.slice(0, 3)
  const skillGroups = portfolio.skillGroups.slice(0, 4)

  return (
    <section id="founder" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative">
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xl">
              <Image
                src="/aditya-pratap-singh-tomar.webp"
                alt="Aditya Pratap Singh Tomar founder portrait"
                width={960}
                height={1200}
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-border bg-background/92 p-4 shadow-xl backdrop-blur">
              <p className="text-sm font-semibold text-foreground">{portfolio.profile.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">Founder, APST AI & Software Services</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">About the Founder</p>
            <h2 className="mt-3 text-3xl font-semibold text-foreground md:text-4xl">
              The portfolio depth behind the service business.
            </h2>
            <div className="mt-5 space-y-4 leading-7 text-muted-foreground">
              <p>
                I am a data scientist and software engineer focused on production-ready AI products,
                backend systems, and deployment. The service site now leads with client outcomes, but
                the work is still backed by hands-on engineering across ML, APIs, RAG, automation, and SaaS.
              </p>
              <p>
                I am pursuing B.Tech in Computer Science Engineering at Jabalpur Engineering College
                and have worked across AI engineering, backend development, SaaS architecture, and ML systems.
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {portfolio.profile.stats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-border bg-card/70 p-4">
                  <p className="text-xl font-semibold text-primary">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <article className="rounded-xl border border-border bg-card/70 p-4">
                <BriefcaseBusiness className="h-5 w-5 text-primary" />
                <h3 className="mt-3 font-semibold text-foreground">Experience</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  AI Engineer, SDE Intern, Lead Engineer, and ML intern roles across startup product work.
                </p>
              </article>
              <article className="rounded-xl border border-border bg-card/70 p-4">
                <Trophy className="h-5 w-5 text-primary" />
                <h3 className="mt-3 font-semibold text-foreground">Achievements</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  SIH finalist, Kaggle top ranking, GATE DA rank, and consistent DSA practice.
                </p>
              </article>
              <article className="rounded-xl border border-border bg-card/70 p-4">
                <GraduationCap className="h-5 w-5 text-primary" />
                <h3 className="mt-3 font-semibold text-foreground">Education</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {education.degree}, {education.field}, {education.score}.
                </p>
              </article>
            </div>

            <div className="mt-6 rounded-xl border border-border bg-card/70 p-5">
              <p className="text-sm font-semibold text-foreground">Recent roles</p>
              <div className="mt-3 space-y-3">
                {topExperience.map((item) => (
                  <div key={item.id} className="flex flex-col gap-1 border-b border-border pb-3 last:border-0 last:pb-0">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-medium text-foreground">
                        {item.role}, {item.company}
                      </p>
                      <p className="text-xs text-muted-foreground">{item.period}</p>
                    </div>
                    <p className="text-xs leading-5 text-muted-foreground">{item.highlights[0]}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {skillGroups.flatMap((group) => group.items.slice(0, 4)).map((skill) => (
                <span key={skill} className="rounded-md border border-border bg-background/70 px-3 py-1 text-sm">
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium transition hover:border-primary/50"
              >
                Full founder profile
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/resume.pdf"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              >
                View resume
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
