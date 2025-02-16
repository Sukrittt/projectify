import { api } from "~/trpc/react";

export const useTips = () => {
  return api.ai.generateTips.useQuery();
};
