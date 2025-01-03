import { z } from "zod";

export const PromptValidator = z.object({
  previousQuestions: z.array(z.object({ question: z.string() })),
});

export type PromptValidatorType = z.infer<typeof PromptValidator>;
