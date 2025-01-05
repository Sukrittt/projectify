import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { toast } from "~/hooks/use-toast";
import { type CodeEvaluatorValidatorType } from "~/types/validator";

export const useMiniGameEvalutor = (
  setHasNewChanges: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const [feedback, setFeedback] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);

  const { mutate: evaluateCode, isPending } = useMutation({
    mutationFn: async ({ question, answer }: CodeEvaluatorValidatorType) => {
      setIsCorrect(undefined);
      const response = await fetch("/api/ai/evaluate", {
        method: "POST",
        body: JSON.stringify({ question, answer }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate response.");
      }

      return response.body;
    },
    onSuccess: async (stream) => {
      if (!stream || stream === null) {
        toast({
          title: "Oops, something went wrong!",
        });
        return;
      } else {
        const reader = stream.getReader();
        const decoder = new TextDecoder();
        let done = false;

        let accResponse = "";

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          const chunkValue = decoder.decode(value);

          accResponse += chunkValue;

          setFeedback(extractQuestion(accResponse));
          setIsCorrect(
            extractBooleanValue(accResponse) === "true" ?? undefined,
          );
          setHasNewChanges(false);
        }
      }
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
