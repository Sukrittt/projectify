import { z } from "zod";

export const PromptValidator = z.object({
  previousQuestions: z.array(z.object({ question: z.string() })),
});

export type PromptValidatorType = z.infer<typeof PromptValidator>;

export const CodeEvaluatorValidator = z.object({
  question: z.string(),
  answer: z.string(),
});

export type CodeEvaluatorValidatorType = z.infer<typeof CodeEvaluatorValidator>;
