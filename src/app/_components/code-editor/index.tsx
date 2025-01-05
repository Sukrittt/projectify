"use client";
import { CodeiumEditor } from "@codeium/react-code-editor";

import "./styles.css";

interface CodeEditorProps {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  language: string;
  setHasNewChanges: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  setCode,
  language,
  setHasNewChanges,
}) => {
  return (
    <CodeiumEditor
      value={code}
      onChange={(val) => {
        if (!val) return;

        setCode(val);
        setHasNewChanges(true);
      }}
      language={language}
      className="h-full grow"
      theme="vs-dark"
    />
  );
};
