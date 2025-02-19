import { api } from "~/trpc/react";

export const useTriviaQuestions = () => {
  return api.ai.generateTrivia.useQuery();
};
