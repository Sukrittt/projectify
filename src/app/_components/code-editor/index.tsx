"use client";
import { CodeiumEditor } from "@codeium/react-code-editor";

import "./styles.css";

interface CodeEditorProps {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  language: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  setCode,
  language,
}) => {
  return (
    <CodeiumEditor
      value={code}
      onChange={(val) => {
        if (!val) return;

        setCode(val);
      }}
      language={language}
      theme="vs-dark"
    />
  );
};
