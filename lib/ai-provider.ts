import "server-only"

type ChatMessage = {
  role: "system" | "user" | "assistant"
  content: string
}

type Provider = "openrouter" | "gemini" | "huggingface"

type ProviderConfig = {
  provider: Provider
  apiKey?: string
  model?: string
  apiUrl?: string
}

function getProviderConfig(): ProviderConfig {
  const provider = (process.env.AI_PROVIDER ?? "openrouter") as Provider
  return {
    provider,
    apiKey: process.env.AI_API_KEY,
    model: process.env.AI_MODEL,
    apiUrl: process.env.AI_API_URL,
  }
}

function assertConfig(config: ProviderConfig) {
  if (!config.apiKey || !config.model || !config.apiUrl) {
    throw new Error("Missing AI configuration. Set AI_PROVIDER, AI_API_KEY, AI_MODEL, and AI_API_URL.")
  }
}

export async function generateCompletion(messages: ChatMessage[]): Promise<string> {
  const config = getProviderConfig()
  assertConfig(config)

  switch (config.provider) {
    case "gemini":
      return callGemini(messages, config)
    case "huggingface":
      return callHuggingFace(messages, config)
    default:
      return callOpenRouter(messages, config)
  }
}

async function callOpenRouter(messages: ChatMessage[], config: ProviderConfig): Promise<string> {
  const response = await fetch(config.apiUrl as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiKey}`,
      "X-Title": "Aditya Portfolio",
    },
    body: JSON.stringify({
      model: config.model,
      messages,
      temperature: 0.2,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`OpenRouter request failed: ${errorText}`)
  }

  const data = (await response.json()) as {
    choices?: { message?: { content?: string } }[]
  }

  return data.choices?.[0]?.message?.content?.trim() ?? ""
}

async function callGemini(messages: ChatMessage[], config: ProviderConfig): Promise<string> {
  const contents = messages.map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.content }],
  }))

  const apiUrl = buildGeminiUrl(config)
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": config.apiKey as string,
    },
    body: JSON.stringify({
      contents,
      generationConfig: {
        temperature: 0.2,
      },
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Gemini request failed: ${errorText}`)
  }

  const data = (await response.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[]
  }

  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? ""
}

function buildGeminiUrl(config: ProviderConfig): string {
  const baseUrl = config.apiUrl as string
  if (baseUrl.includes("{model}")) {
    return baseUrl.replace("{model}", `models/${config.model}`)
  }
  if (baseUrl.endsWith("/v1beta/")) {
    return `${baseUrl}models/${config.model}:generateContent`
  }
  if (baseUrl.endsWith("/v1beta")) {
    return `${baseUrl}/models/${config.model}:generateContent`
  }
  return baseUrl
}

async function callHuggingFace(messages: ChatMessage[], config: ProviderConfig): Promise<string> {
  const prompt = messages.map((message) => `${message.role.toUpperCase()}: ${message.content}`).join("\n")
  const response = await fetch(config.apiUrl as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      inputs: prompt,
      parameters: {
        temperature: 0.2,
        max_new_tokens: 512,
      },
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`HuggingFace request failed: ${errorText}`)
  }

  const data = (await response.json()) as { generated_text?: string }[]
  const output = data?.[0]?.generated_text ?? ""
  return output.split("ASSISTANT:").pop()?.trim() ?? output.trim()
}
