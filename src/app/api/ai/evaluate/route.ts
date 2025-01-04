import { currentUser } from "@clerk/nextjs/server";
import { OpenAIStream, StreamingTextResponse } from "ai";

import { personality } from "~/constants/ai";
import { generateContent } from "~/lib/openai";
import { CodeEvaluatorValidator } from "~/types/validator";

// IMPORTANT! Set the runtime to edge: https://vercel.com/docs/functions/edge-functions/edge-runtime
export const runtime = "edge";

export async function POST(req: Request): Promise<Response> {
  try {
    const user = await currentUser();

    if (!user) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    const body = await req.json();

    const { question, answer } = CodeEvaluatorValidator.parse(body);

    const payload = { question, answer };

    const content = await generateContent(
      personality.MINI_GAME_EVALUATOR,
      JSON.stringify(payload),
    );

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(content);

    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log("Stream Error", error);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
}
