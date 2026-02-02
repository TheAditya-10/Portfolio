import "server-only"

import path from "path"
import { promises as fs } from "fs"
import portfolio from "@/data/portfolio.json"

export type PortfolioData = typeof portfolio

export type Project = PortfolioData["projects"][number]

export function getPortfolioData(): PortfolioData {
  return portfolio
}

export function getProjectById(projectId: string): Project | undefined {
  return portfolio.projects.find((project) => project.id === projectId)
}

export async function getProjectContext(projectId: string): Promise<string> {
  const project = getProjectById(projectId)
  if (!project) return ""
  const filePath = path.join(process.cwd(), project.caseStudy)
  try {
    return await fs.readFile(filePath, "utf8")
  } catch (error) {
    console.error("Unable to load project context", error)
    return ""
  }
}
