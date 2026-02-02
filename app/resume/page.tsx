import { Navigation } from "@/components/navigation"
import { ResumeTailorSection } from "@/components/resume-tailor-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { AiChatWidget } from "@/components/ai-chat-widget"

export default function ResumePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(15,23,42,0.9),_rgba(2,6,23,0.6))]" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="rounded-3xl border border-border bg-card/70 p-10 shadow-2xl">
            {/* <p className="text-xs font-mono uppercase tracking-[0.35em] text-muted-foreground">Role Fit Check</p> */}
            {/* <h1 className="mt-4 text-3xl font-semibold md:text-4xl">Check role suitability fast</h1>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
              Paste a job description and get a tailored, ATS-friendly fit summary. The AI uses only verified portfolio
              data and highlights projects, skills, and impact aligned to the role.
            </p> */}
            {/* <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-border bg-background/60 p-4">
                <p className="text-xs text-muted-foreground">Output includes</p>
                <p className="mt-2 text-sm">Role summary, top skills, matched projects, and a fit rationale.</p>
              </div>
              <div className="rounded-2xl border border-border bg-background/60 p-4">
                <p className="text-xs text-muted-foreground">Format</p>
                <p className="mt-2 text-sm">ATS-friendly text ready for email, LinkedIn, or recruiter notes.</p>
              </div>
              <div className="rounded-2xl border border-border bg-background/60 p-4">
                <p className="text-xs text-muted-foreground">Privacy</p>
                <p className="mt-2 text-sm">Session-only; no data is stored beyond this browser session.</p>
              </div>
            </div> */}
          </div>
        </div>
      </section>
      <ResumeTailorSection />
      <ContactSection />
      <Footer />
      <AiChatWidget />
    </main>
  )
}
