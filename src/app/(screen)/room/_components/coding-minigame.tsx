import Markdown from "react-markdown";
import { useEffect, useState, useRef } from "react";

import { CodeEditor } from "~/app/_components/code-editor";
import { useMiniGameQuestion } from "~/app/(screen)/room/_hooks/useMiniGameQuestion";

export const CodingMiniGame = () => {
  const [codeBlock, setCodeBlock] = useState("");

  const { generateMinigame, question, language, isPending } =
    useMiniGameQuestion(setCodeBlock);

  const hasGenerated = useRef(false);

  useEffect(() => {
    if (isPending || hasGenerated.current) return;

    generateMinigame();
    hasGenerated.current = true;
  }, []);

  return (
    <div className="flex h-full w-full flex-col gap-y-4 pt-4">
      <div className="activity-content rounded-xl bg-[#1e1e1e] p-4">
        <Markdown className="leading-8">{`Q. ${question}`}</Markdown>
      </div>

      <div className="code-editor activity-content grow">
        <CodeEditor
          code={codeBlock}
          setCode={setCodeBlock}
          language={language}
        />
      </div>
    </div>
  );
};
