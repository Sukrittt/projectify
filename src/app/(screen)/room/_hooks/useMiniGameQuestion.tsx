import { useState } from "react";

import { api } from "~/trpc/react";
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

  const { mutate: generateMinigame, isPending } =
    api.ai.generateQuestion.useMutation({
      onSuccess: (response) => {
        const { data } = response;

        if (!data) {
          toast({
            title: "Oops, something went wrong!",
            description: "Please try again later.",
          });
          return;
        }

        setQuestion(extractQuestion(data));
        setCodeBlock(extractBoilerPlate(data) ?? "");
        setLanguage(extractLanguage(data) ?? "");

        setPreviousQuestions((prev) => [...prev, { question: data }]);
      },
    });

  return { generateMinigame, isPending, question, language, previousQuestions };
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
