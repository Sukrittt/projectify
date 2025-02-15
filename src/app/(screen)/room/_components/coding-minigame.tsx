import { useAtom } from "jotai";
import { useEffect, useState, useRef } from "react";

import { streamAtom } from "~/atom";
import { Skeleton } from "~/components/ui/skeleton";
import { EvaluateMinigame } from "./evaluate-minigame";
import { CodeEditor } from "~/app/_components/code-editor";
import { StreamingMarkdown } from "~/app/_components/stream-text";
import { useMiniGameQuestion } from "~/app/(screen)/room/_hooks/useMiniGameQuestion";

export const CodingMiniGame = () => {
  const [stream] = useAtom(streamAtom);

  const [codeBlock, setCodeBlock] = useState("");
  const [hasNewChanges, setHasNewChanges] = useState(false);

  const { generateMinigame, question, language, previousQuestions } =
    useMiniGameQuestion(setCodeBlock);

  const hasGenerated = useRef(false);

  const isPending = question.length === 0;

  useEffect(() => {
    if (hasGenerated.current) return;

    generateMinigame({ previousQuestions });
    hasGenerated.current = true;
  }, []);

  return (
    <div className="flex h-full w-full flex-col gap-y-4 pt-4">
      <div className="rounded-xl bg-accent p-4">
        <div className="text-sm leading-8">
          {isPending ? (
            <Skeleton className="h-4 w-full" />
          ) : (
            <StreamingMarkdown
              preventStreamReset
              speed={stream ? 10 : 0}
              content={`Q. ${question}`}
            />
          )}
        </div>
      </div>

      <div className="code-editor grow">
        {isPending ? (
          <div className="h-96 rounded-xl bg-accent p-4">
            <Skeleton className="h-full w-full rounded-xl" />
          </div>
        ) : (
          <CodeEditor
            code={codeBlock}
            setCode={setCodeBlock}
            language={language}
            setHasNewChanges={setHasNewChanges}
          />
        )}
      </div>

      <EvaluateMinigame
        isLoading={isPending}
        code={codeBlock}
        question={question}
        hasNewChanges={hasNewChanges}
        setHasNewChanges={setHasNewChanges}
        handleSuccess={() => generateMinigame({ previousQuestions })}
      />
    </div>
  );
};
