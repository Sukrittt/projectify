import apiClient from "~/utils/axios";
import { CodeEvaluatorValidator, PromptValidator } from "~/types/validator";
import { personality } from "~/constants/ai";
import type { CodingMinigamePayload } from "~/types";
import { generateContentWithGemini } from "~/lib/gemini";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const aiRouter = createTRPCRouter({
  generateQuestion: privateProcedure
    .input(PromptValidator)
    .mutation(async ({ ctx, input }) => {
      const { previousQuestions } = input;

      const response = await apiClient.post(
        `/generate/payload/coding-minigame`,
        {
          clerkId: ctx.user.id,
        },
      );

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
});
