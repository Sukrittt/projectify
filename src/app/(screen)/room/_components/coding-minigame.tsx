import { useAtom } from "jotai";
import { useEffect, useState, useRef } from "react";

import { streamAtom } from "~/atom";
import { EvaluateMinigame } from "./evaluate-minigame";
import { CodeEditor } from "~/app/_components/code-editor";
import { StreamingMarkdown } from "~/app/_components/stream-text";
import { useMiniGameQuestion } from "~/app/(screen)/room/_hooks/useMiniGameQuestion";

export const CodingMiniGame = () => {
  const [stream] = useAtom(streamAtom);

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
        <p className="text-sm leading-8">
          <StreamingMarkdown
            preventStreamReset
            speed={stream ? 10 : 0}
            content={`Q. ${question}`}
          />
        </p>
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
