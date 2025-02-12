import Markdown from "react-markdown";
import { useEffect, useState, useRef } from "react";

import { EvaluateMinigame } from "./evaluate-minigame";
import { CodeEditor } from "~/app/_components/code-editor";
import { useMiniGameQuestion } from "~/app/(screen)/room/_hooks/useMiniGameQuestion";

export const CodingMiniGame = () => {
  const [codeBlock, setCodeBlock] = useState("");
  const [hasNewChanges, setHasNewChanges] = useState(false);

  const { generateMinigame, question, language, isPending, previousQuestions } =
    useMiniGameQuestion(setCodeBlock);

  const hasGenerated = useRef(false);

  useEffect(() => {
    if (isPending || hasGenerated.current) return;

    generateMinigame({ previousQuestions });
    hasGenerated.current = true;
  }, []);

  return (
    <div className="flex h-full w-full flex-col gap-y-4 pt-4">
      <div className="rounded-xl bg-accent p-4">
        <Markdown className="text-sm leading-8">{`Q. ${question}`}</Markdown>
      </div>

      <div className="code-editor grow">
        <CodeEditor
          code={codeBlock}
          setCode={setCodeBlock}
          language={language}
          setHasNewChanges={setHasNewChanges}
        />
      </div>

      <EvaluateMinigame
        question={question}
        code={codeBlock}
        hasNewChanges={hasNewChanges}
        setHasNewChanges={setHasNewChanges}
        handleSuccess={() => generateMinigame({ previousQuestions })}
      />
    </div>
  );
};
