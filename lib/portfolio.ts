import "server-only"

import path from "path"
import { promises as fs } from "fs"
import { portfolioData } from "@/lib/content"

export type PortfolioData = typeof portfolioData

export type Project = PortfolioData["projects"][number]

export function getPortfolioData(): PortfolioData {
  return portfolioData
}

export function getProjectById(projectId: string): Project | undefined {
  return portfolioData.projects.find((project) => project.id === projectId)
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
