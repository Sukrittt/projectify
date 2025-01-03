import Markdown from "react-markdown";
import { useEffect, useState } from "react";

import { CodeEditor } from "~/app/_components/code-editor";
import { useMiniGameQuestion } from "~/app/(screen)/room/_hooks/useMiniGameQuestion";

export const CodingMiniGame = () => {
  const [codeBlock, setCodeBlock] = useState("");

  const { generateMinigame, question } = useMiniGameQuestion(setCodeBlock);

  useEffect(() => {
    generateMinigame();
  }, []);

  return (
    <div className="flex w-full flex-col gap-y-4 pt-4">
      <div className="rounded-xl bg-[#1e1e1e] p-4">
        <Markdown className="leading-8">{`Q. ${question}`}</Markdown>
      </div>

      <CodeEditor
        code={codeBlock}
        setCode={setCodeBlock}
        language="typescript"
      />
    </div>
  );
};
