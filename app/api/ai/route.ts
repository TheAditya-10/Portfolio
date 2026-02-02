import { NextResponse } from "next/server"
import { generateCompletion } from "@/lib/ai-provider"
import { retrieveRelevantContext } from "@/lib/rag"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const message = String(body?.message ?? "")
    const intent = String(body?.intent ?? "general")

    if (!message.trim()) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 })
    }

    const contextEntries = retrieveRelevantContext(message)
    const contextBlock = contextEntries
      .map((entry) => `- (${entry.type}) ${entry.title}: ${entry.content}`)
      .join("\n")

    const systemPrompt = `You are Aditya's Personal AI Portfolio Assistant.\n\nRules:\n- Use ONLY the provided portfolio context, but you may infer and summarize (do not invent new facts).\n- For generic questions (e.g., \"best project\"), provide a reasoned recommendation based on available impact, skills, and highlights.\n- If context is insufficient, ask a brief clarifying question and suggest a likely option.\n- Keep responses concise, professional, and recruiter-friendly.\n- Tailor tone based on intent: recruiter, tech, or research.\n\nIntent: ${intent}.\n\nPortfolio Context:\n${contextBlock}`

    const response = await generateCompletion([
      { role: "system", content: systemPrompt },
      { role: "user", content: message },
    ])

    return NextResponse.json({ response, sources: contextEntries })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
