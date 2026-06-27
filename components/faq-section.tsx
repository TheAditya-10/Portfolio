import Link from "next/link"
import { ArrowRight, HelpCircle } from "lucide-react"
import { faqs } from "@/lib/service-data"

export function FAQSection() {
  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">Before You Enquire</p>
            <h2 className="mt-3 text-3xl font-semibold text-foreground md:text-4xl">
              Questions founders usually ask first.
            </h2>
            <p className="mt-4 text-muted-foreground">
              If your project involves an AI product, chatbot, RAG system, backend, or automation workflow,
              this should help you decide whether it is worth a conversation.
            </p>
            <Link
              href="#enquiry"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Let's Build Your Project
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {faqs.map((item) => (
              <article key={item.question} className="rounded-xl border border-border bg-card/70 p-6">
                <div className="flex gap-3">
                  <HelpCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <h3 className="font-semibold text-foreground">{item.question}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.answer}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
