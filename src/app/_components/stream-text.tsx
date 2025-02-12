import { useAtom } from "jotai";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { streamAtom } from "~/atom";

interface StreamingMarkdownProps {
  content: string;
  speed?: number;
  preventStreamReset?: boolean;
}

export function StreamingMarkdown({
  content,
  speed = 10,
  preventStreamReset = false,
}: StreamingMarkdownProps) {
  const [displayedContent, setDisplayedContent] = useState("");
  const [stream, setIsStreaming] = useAtom(streamAtom);

  useEffect(() => {
    if (speed === 0) {
      setDisplayedContent(content);

      if (!preventStreamReset) {
        setIsStreaming(false);
      }
      return;
    }

    let currentLength = 0;
    setDisplayedContent("");

    const interval = setInterval(() => {
      if (currentLength < content.length) {
        currentLength += 1;
        setDisplayedContent(content.slice(0, currentLength));
      } else {
        if (!preventStreamReset) {
          setIsStreaming(false);
        }
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [content, setIsStreaming, speed, stream, preventStreamReset]);

  return (
    <div className="prose prose-sm dark:prose-invert prose-headings:text-gray-800 dark:prose-headings:text-gray-100 prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-pre:bg-gray-50 dark:prose-pre:bg-gray-900 prose-blockquote:text-gray-500 dark:prose-blockquote:text-gray-400 prose-li:text-gray-600 dark:prose-li:text-gray-300 prose-img:rounded-lg prose-hr:border-gray-200 dark:prose-hr:border-gray-800 max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={vs}
                language={match[1]}
                PreTag="div"
                className="rounded-md"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code
                className={`${className} rounded bg-gray-100 px-1.5 py-0.5 dark:bg-gray-800`}
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {displayedContent}
      </ReactMarkdown>
    </div>
  );
}
