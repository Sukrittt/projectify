import { TRPCError } from "@trpc/server";

import apiClient from "~/utils/axios";
import { personality } from "~/constants/ai";
import { generateContentWithGemini } from "~/lib/gemini";
import type { CodingMinigamePayload, TipsPayload } from "~/types";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { CodeEvaluatorValidator, PromptValidator } from "~/types/validator";

export const aiRouter = createTRPCRouter({
  generateQuestion: privateProcedure
    .input(PromptValidator)
    .mutation(async ({ ctx, input }) => {
      const { previousQuestions } = input;

      const response = await apiClient.post(`/generate/payload/waiting-room`, {
        clerkId: ctx.user.id,
      });

      const payload = {
        ...response.data,
        previousQuestions,
      } as CodingMinigamePayload;

      const data = await generateContentWithGemini(
        JSON.stringify(payload),
        personality.WAITING_ROOM_QUESTION_GENERATION,
      );

      return {
        ok: true,
        data,
        message: "Successfully generated question.",
      };
    }),
  evaluateCode: privateProcedure
    .input(CodeEvaluatorValidator)
    .mutation(async ({ input }) => {
      const { answer, question } = input;

      const payload = { question, answer };

      const data = await generateContentWithGemini(
        JSON.stringify(payload),
        personality.MINI_GAME_EVALUATOR,
      );

      return {
        ok: true,
        data,
        message: "Successfully generated question.",
      };
    }),
  generateTips: privateProcedure.query(async ({ ctx }) => {
    const response = await apiClient.post(`/generate/payload/waiting-room`, {
      clerkId: ctx.user.id,
    });

    const payload = {
      ...response.data,
    } as Omit<CodingMinigamePayload, "previousQuestions">;

    const data = await generateContentWithGemini(
      JSON.stringify(payload),
      personality.TIPS_GENERATOR,
    );

    if (!data) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Failed to generate tips.",
      });
    }

    const formattedTips = extractAndParseJSON(data).tips as TipsPayload["tips"];

    return {
      ok: true,
      data: formattedTips,
      message: "Successfully generated tips.",
    };
  }),
});

function extractAndParseJSON(response: string) {
  const match = response.match(/```json([\s\S]*?)```/);
  if (match?.[1]) {
    return JSON.parse(match[1].trim());
  }
  return null;
}
