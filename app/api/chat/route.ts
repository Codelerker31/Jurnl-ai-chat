import { streamText } from "ai";
import { perplexity } from "@ai-sdk/perplexity";
import { createRouteHandlerClient } from '@/lib/supabase/server';

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const systemPrompt = "You are an AI research assistant. Provide concise, accurate, and cited answers based on your search results.";

  const result = streamText({
    model: perplexity("llama-3-sonar-small-32k-online"),
    system: systemPrompt,
    messages,
    onFinish: async ({ text }) => {
      // Save messages to database if user is authenticated
      const supabase = await createRouteHandlerClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        try {
          // Get the last user message (most recent one)
          const lastUserMessage = messages[messages.length - 1];
          
          // Insert user message
          if (lastUserMessage && lastUserMessage.role === 'user') {
            await supabase
              .from('chat_messages')
              .insert({
                user_id: user.id,
                content: lastUserMessage.content,
                role: 'user'
              });
          }
          
          // Insert AI response
          await supabase
            .from('chat_messages')
            .insert({
              user_id: user.id,
              content: text,
              role: 'assistant'
            });
        } catch (error) {
          console.error('Error saving messages to database:', error);
        }
      }
    }
  });

  return result.toDataStreamResponse();
}
