import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: openai("gpt-4o"),
    system:
      "You are Jurnl, a personal AI research assistant. Provide helpful, accurate, and well-researched responses. Always aim to be informative and cite relevant sources when possible.",
    messages,
  })

  return result.toDataStreamResponse()
}
