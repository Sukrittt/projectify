import { useState } from "react";

import { api } from "~/trpc/react";
import { toast } from "~/hooks/use-toast";

export const useMiniGameEvalutor = (
  setHasNewChanges: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const [feedback, setFeedback] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);

  const { mutate: evaluateCode, isPending } = api.ai.evaluateCode.useMutation({
    onSuccess: (response) => {
      const { data } = response;

      if (!data) {
        toast({
          title: "Oops, something went wrong!",
          description: "Please try again later.",
        });
        return;
      }

      setFeedback(extractQuestion(data));
      setIsCorrect(extractBooleanValue(data) === "true");
      setHasNewChanges(false);
    },
  });

  return { evaluateCode, isPending, feedback, isCorrect };
};

function extractBooleanValue(input: string | null | undefined) {
  const match = input?.match(/\$\$\$\$(.*?)\$\$\$\$/s);
  return match ? match[1]?.trim() : null;
}

function extractQuestion(input: string): string {
  return input.replace(/\$\$\$\$.*$/s, "").trim();
}
