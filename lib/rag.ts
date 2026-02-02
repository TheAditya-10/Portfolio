import "server-only"

import { getPortfolioData } from "@/lib/portfolio"

const STOP_WORDS = new Set([
  "the",
  "a",
  "an",
  "and",
  "or",
  "to",
  "of",
  "in",
  "for",
  "on",
  "with",
  "by",
  "is",
  "are",
  "as",
  "at",
  "from",
  "that",
  "this",
  "it",
  "be",
  "was",
  "were",
])

export type RagEntry = {
  id: string
  type: "project" | "experience" | "skill" | "research" | "achievement"
  title: string
  content: string
}

export function chunkText(text: string, size = 700, overlap = 120): string[] {
  if (text.length <= size) return [text]
  const chunks: string[] = []
  let start = 0
  while (start < text.length) {
    const end = Math.min(start + size, text.length)
    chunks.push(text.slice(start, end))
    start = end - overlap
    if (start < 0) start = 0
  }
  return chunks
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token && !STOP_WORDS.has(token))
}

function scoreText(query: string, text: string): number {
  const queryTokens = new Set(tokenize(query))
  if (queryTokens.size === 0) return 0
  const textTokens = tokenize(text)
  let score = 0
  for (const token of textTokens) {
    if (queryTokens.has(token)) score += 1
  }
  return score / Math.max(textTokens.length, 1)
}

export function buildPortfolioEntries(): RagEntry[] {
  const data = getPortfolioData()
  const entries: RagEntry[] = []

  for (const project of data.projects) {
    entries.push({
      id: project.id,
      type: "project",
      title: project.title,
      content: [
        project.tagline,
        project.impact,
        project.highlights.join(" "),
        project.skills.join(", "),
        project.tools.join(", "),
      ].join(" "),
    })
  }

  for (const experience of data.experience) {
    entries.push({
      id: experience.id,
      type: "experience",
      title: `${experience.role} @ ${experience.company}`,
      content: [experience.period, experience.highlights.join(" "), experience.stack.join(", ")].join(" "),
    })
  }

  for (const skill of data.skills) {
    entries.push({
      id: skill.id,
      type: "skill",
      title: skill.name,
      content: [skill.summary, skill.projects.join(", "), skill.tools.join(", ")].join(" "),
    })
  }

  for (const research of data.research) {
    entries.push({
      id: research.id,
      type: "research",
      title: research.title,
      content: [research.summary, research.area, research.year].join(" "),
    })
  }

  for (const achievement of data.achievements) {
    entries.push({
      id: achievement.id,
      type: "achievement",
      title: achievement.title,
      content: achievement.detail,
    })
  }

  return entries
}

export function retrieveRelevantContext(query: string, limit = 6): RagEntry[] {
  const entries = buildPortfolioEntries()
  const ranked = entries
    .map((entry) => ({
      entry,
      score: scoreText(query, `${entry.title} ${entry.content}`),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.entry)

  return ranked
}
