import portfolio from "@/data/portfolio.json"
import projects from "@/data/content/projects/projects.json"
import certifications from "@/data/content/certifications/certifications.json"
import research from "@/data/content/research/research.json"

export type BasePortfolioData = typeof portfolio
export type Project = (typeof projects)[number]
export type Certification = (typeof certifications)[number]
export type ResearchItem = {
  id: string
  title: string
  summary: string
  area: string
  year: string
}

export type ProjectTrack = "major" | "hackathon" | "learning"
export type ProjectVariant = "flagship" | "all" | ProjectTrack

export type PortfolioData = BasePortfolioData & {
  projects: Project[]
  certifications: Certification[]
  research: ResearchItem[]
}

const researchItems = research as ResearchItem[]

export const portfolioData: PortfolioData = {
  ...portfolio,
  projects,
  certifications,
  research: researchItems,
}

export function getProjectsByVariant(variant: ProjectVariant): Project[] {
  if (variant === "all") return projects
  if (variant === "flagship") return projects.filter((project) => project.flagship)
  return projects.filter((project) => project.track === variant)
}
