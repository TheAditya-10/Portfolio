import portfolio from "@/data/portfolio.json"

const socials = portfolio.profile.socials

const SOCIAL_GROUPS = [
  {
    title: "Code & Practice",
    description: "Daily builds, contests, and growth logs.",
    items: [
      { label: "GitHub", href: socials.github },
      { label: "LeetCode", href: socials.leetcode },
      { label: "Codeforces", href: socials.codeforces },
      { label: "GFG", href: socials.gfg }
    ]
  },
  {
    title: "Social & Media",
    description: "Stories, updates, and behind the scenes.",
    items: [
      { label: "LinkedIn", href: socials.linkedin },
      { label: "Instagram", href: socials.instagram },
      { label: "X", href: socials.x },
      { label: "YouTube", href: socials.youtube }
    ]
  },
  {
    title: "Direct Connect",
    description: "Fastest ways to reach me personally.",
    items: [
      { label: "Email", href: `mailto:${portfolio.profile.email}` },
      { label: "WhatsApp", href: socials.whatsapp }
    ]
  }
]

export function SocialsSection() {
  return (
    <section id="socials" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">Socials</p>
          <h2 className="mt-3 text-3xl font-semibold">Find me online</h2>
          <p className="mt-2 text-muted-foreground">Split by how we can connect, collaborate, or keep in touch.</p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {SOCIAL_GROUPS.map((group) => (
            <div key={group.title} className="rounded-2xl border border-border bg-card/70 p-6">
              <h3 className="text-lg font-semibold">{group.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{group.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
