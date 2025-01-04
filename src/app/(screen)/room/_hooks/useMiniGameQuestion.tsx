import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { toast } from "~/hooks/use-toast";
import { type PromptValidatorType } from "~/types/validator";

export const useMiniGameQuestion = (
  setCodeBlock: React.Dispatch<React.SetStateAction<string>>,
) => {
  const [question, setQuestion] = useState("");
  const [language, setLanguage] = useState("");

  const [previousQuestions, setPreviousQuestions] = useState<
    PromptValidatorType["previousQuestions"]
  >([]);

  const { mutate: generateMinigame, isPending } = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        body: JSON.stringify({ previousQuestions }),
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

          setQuestion(extractQuestion(accResponse));
          setCodeBlock(extractBoilerPlate(accResponse) ?? "");
          setLanguage(extractLanguage(accResponse) ?? "");
        }

        setPreviousQuestions((prev) => [...prev, { question: accResponse }]);
      }

      toast({
        title: "Question generated!",
        description: "Let's see what you can do!",
      });
    },
  });

  return { generateMinigame, isPending, question, language };
};

function extractBoilerPlate(input: string | null | undefined) {
  const match = input?.match(/\^\^\^\^(.*?)\^\^\^\^/s);
  return match ? match[1]?.trim() : null;
}

function extractQuestion(input: string): string {
  return input.replace(/\^\^\^\^.*$/s, "").trim();
}

function extractLanguage(input: string | null | undefined) {
  const match = input?.match(/\$\$\$\$(.*?)\$\$\$\$/s);
  return match ? match[1]?.trim() : null;
}
