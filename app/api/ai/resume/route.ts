import { NextResponse } from "next/server"
import { generateCompletion } from "@/lib/ai-provider"
import { getPortfolioData } from "@/lib/portfolio"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const jobDescription = String(body?.jobDescription ?? "")

    if (!jobDescription.trim()) {
      return NextResponse.json({ error: "Job description is required." }, { status: 400 })
    }

    const data = getPortfolioData()
    const contextBlock = `Profile: ${data.profile.summary}\nExperience: ${data.experience
      .map((exp) => `${exp.role} @ ${exp.company} (${exp.period}). Highlights: ${exp.highlights.join(" ")}`)
      .join("\n")}\nProjects: ${data.projects
      .map((project) => `${project.title}: ${project.tagline}. Impact: ${project.impact}`)
      .join("\n")}\nSkills: ${data.skills.map((skill) => `${skill.name} (${skill.tools.join(", ")})`).join(" | ")}`

    const systemPrompt = `You are an AI resume tailoring assistant for Aditya Pratap Singh Tomar.\n\nRules:\n- Use ONLY the provided portfolio context.\n- Output must be ATS-friendly plain text with NO markdown symbols (no **, *, #, or backticks).\n- Provide a role-specific summary, top 5 matched skills, 3 relevant projects, and a short "Why Aditya fits" paragraph.\n- Keep it concise, professional, and accurate.\n\nPortfolio Context:\n${contextBlock}`

    const response = await generateCompletion([
      { role: "system", content: systemPrompt },
      { role: "user", content: jobDescription },
    ])

    return NextResponse.json({ response })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
