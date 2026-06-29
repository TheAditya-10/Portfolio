import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, CheckCircle2, ExternalLink, Github } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { AiChatWidget } from "@/components/ai-chat-widget"
import { LeadMagnetSection } from "@/components/lead-magnet-section"
import { getProjectsByVariant, type Project } from "@/lib/content"
import { projectCaseStudies, servicePackages } from "@/lib/service-data"

type PageProps = {
  params: Promise<{ id: string }>
}

const allProjects = getProjectsByVariant("all")

export function generateStaticParams() {
  return allProjects.map((project) => ({ id: project.id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const project = getProjectById(id)

  if (!project) {
    return {
      title: "Case Study",
    }
  }

  const caseStudy = getProjectCaseStudy(project)

  return {
    title: `${project.title} Case Study`,
    description: `${caseStudy.problem} ${caseStudy.businessImpact}`,
    alternates: {
      canonical: `/case-studies/${project.id}`,
    },
  }
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { id } = await params
  const project = getProjectById(id)

  if (!project) notFound()

  const caseStudy = getProjectCaseStudy(project)
  const relatedServices = servicePackages
    .filter((service) =>
      project.skills.some((skill) => service.keywords.toLowerCase().includes(skill.toLowerCase().split(" ")[0])),
    )
    .slice(0, 3)
  const visibleServices = relatedServices.length ? relatedServices : servicePackages.slice(0, 3)

  return (
    <main className="min-h-screen">
      <Navigation />
      <section className="border-b border-border/70 py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">Case Study</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-foreground md:text-6xl">{project.title}</h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">{project.tagline}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/#enquiry"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
              >
                Build Something Similar
                <ArrowRight className="h-4 w-4" />
              </Link>
              {project.live ? (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-medium text-foreground transition hover:border-primary/50"
                >
                  View Live
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : null}
              {project.repo ? (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-medium text-foreground transition hover:border-primary/50"
                >
                  Repository
                  <Github className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card/75 p-6 shadow-xl">
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground">Business Impact</p>
            <h2 className="mt-3 text-2xl font-semibold text-foreground">{caseStudy.businessImpact}</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <span key={skill} className="rounded-md border border-border bg-background/70 px-2 py-1 text-xs text-muted-foreground">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 lg:grid-cols-3">
          <CaseStudyBlock title="Problem" text={caseStudy.problem} />
          <CaseStudyBlock title="Solution" text={caseStudy.solution} />
          <CaseStudyBlock title="Business Impact" text={caseStudy.businessImpact} />
        </div>
      </section>

      <section className="border-y border-border/70 bg-secondary/35 py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">Delivery Notes</p>
            <h2 className="mt-3 text-3xl font-semibold text-foreground">What this proves for a client project.</h2>
            <p className="mt-4 text-muted-foreground">
              The goal is not to copy this exact product. It is to show the kind of product thinking,
              backend structure, AI workflow, and shipping discipline that can transfer to your business.
            </p>
          </div>
          <div className="grid gap-3">
            {project.highlights.map((item) => (
              <div key={item} className="flex gap-3 rounded-xl border border-border bg-card/80 p-4 text-sm leading-6 text-muted-foreground">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">Technology Stack</p>
              <h2 className="mt-3 text-3xl font-semibold text-foreground">Tools used after the business case was clear.</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span key={tool} className="rounded-md border border-border bg-card/75 px-3 py-2 text-sm text-muted-foreground">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/70 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">Related Services</p>
              <h2 className="mt-3 text-3xl font-semibold text-foreground">Build from this direction.</h2>
            </div>
            <Link href="/services" className="hidden text-sm font-medium text-primary md:inline-flex">
              View all services
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {visibleServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="rounded-xl border border-border bg-card/75 p-5 transition hover:-translate-y-1 hover:border-primary/50"
              >
                <h3 className="font-semibold text-foreground">{service.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{service.description}</p>
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

function getProjectById(id: string) {
  return allProjects.find((project) => project.id === id || project.id.toLowerCase() === id.toLowerCase())
}

function getProjectCaseStudy(project: Project) {
  return (
    projectCaseStudies[project.id] ?? {
      problem: project.tagline,
      solution: project.highlights[0] ?? project.impact,
      businessImpact: project.impact,
    }
  )
}

function CaseStudyBlock({ title, text }: { title: string; text: string }) {
  return (
    <article className="rounded-xl border border-border bg-card/75 p-6">
      <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground">{title}</p>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">{text}</p>
    </article>
  )
}
