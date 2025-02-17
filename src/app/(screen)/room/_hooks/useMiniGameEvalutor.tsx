import { toast } from "sonner";
import { useAtom } from "jotai";
import { useState } from "react";

import { api } from "~/trpc/react";
import { streamAtom } from "~/atom";
import { useSideCannons } from "./useSideCannons";
import type { CorrectSolution, IncorrectSolution } from "~/types";

export const useMiniGameEvalutor = (
  setHasNewChanges: React.Dispatch<React.SetStateAction<boolean>>,
  openDialog: () => void,
) => {
  const [, setIsStreaming] = useAtom(streamAtom);

  const [feedback, setFeedback] = useState<
    CorrectSolution | IncorrectSolution | null
  >(null);

  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);

  const { handleFireConfetti } = useSideCannons();

  const { mutate: evaluateCode, isPending } = api.ai.evaluateCode.useMutation({
    onSuccess: (response) => {
      const { data } = response;

      if (!data) {
        toast.error("Oops, something went wrong!");
        return;
      }

      openDialog();
      setIsStreaming(true);

      const extractedJson = extractAndParseJSON(data) as
        | CorrectSolution
        | IncorrectSolution;

      setFeedback(extractedJson);
      setHasNewChanges(false);

      setIsCorrect(extractedJson.can_proceed);

      if (!extractedJson.can_proceed) return;

      handleFireConfetti();
    },
  });

  return { evaluateCode, isPending, feedback, isCorrect };
};

function extractAndParseJSON(response: string) {
  const match = response.match(/```json([\s\S]*?)```/);
  if (match?.[1]) {
    return JSON.parse(match[1].trim());
  }
  return null;
}
