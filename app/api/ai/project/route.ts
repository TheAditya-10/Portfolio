import { NextResponse } from "next/server"
import { generateCompletion } from "@/lib/ai-provider"
import { getProjectById, getProjectContext } from "@/lib/portfolio"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const message = String(body?.message ?? "")
    const projectId = String(body?.projectId ?? "")

    if (!message.trim() || !projectId) {
      return NextResponse.json({ error: "ProjectId and message are required." }, { status: 400 })
    }

    const project = getProjectById(projectId)
    if (!project) {
      return NextResponse.json({ error: "Project not found." }, { status: 404 })
    }

    const projectContext = await getProjectContext(projectId)
    const systemPrompt = `You are Aditya's project-specific AI assistant.\n\nRules:\n- Answer ONLY using the project context provided.\n- Focus on technical decisions, datasets, architecture, and trade-offs.\n- If something isn't in the context, say so clearly.\n- Keep responses crisp and technical.\n\nProject: ${project.title}\n\nProject Context:\n${projectContext}`

    const response = await generateCompletion([
      { role: "system", content: systemPrompt },
      { role: "user", content: message },
    ])

    return NextResponse.json({ response })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
