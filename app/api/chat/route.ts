import { streamText } from "ai";
import { perplexity } from "@ai-sdk/perplexity";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const systemPrompt = "You are an AI research assistant. Provide concise, accurate, and cited answers based on your search results.";

  const result = streamText({
    model: perplexity("llama-3-sonar-small-32k-online"),
    system: systemPrompt,
    messages,
  });

  return result.toDataStreamResponse();
}
