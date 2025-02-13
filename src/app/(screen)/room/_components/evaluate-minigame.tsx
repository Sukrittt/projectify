import { useAtom } from "jotai";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { streamAtom } from "~/atom";
import { Button } from "~/components/ui/button";
import { LoaderDot } from "~/app/_components/gsap/loader-dot";
import { StreamingMarkdown } from "~/app/_components/stream-text";
import type { CorrectSolution, IncorrectSolution } from "~/types";
import { useMiniGameEvalutor } from "~/app/(screen)/room/_hooks/useMiniGameEvalutor";
import { CustomToolTip } from "~/components/ui/custom-tool-tip";

interface EvaluateMinigameProps {
  question: string;
  code: string;
  isLoading: boolean;
  handleSuccess: () => void;
  hasNewChanges: boolean;
  setHasNewChanges: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EvaluateMinigame: React.FC<EvaluateMinigameProps> = ({
  question,
  code,
  handleSuccess,
  hasNewChanges,
  setHasNewChanges,
  isLoading,
}) => {
  const [stream] = useAtom(streamAtom);

  const [open, setOpen] = useState(false);

  const { evaluateCode, feedback, isPending, isCorrect } = useMiniGameEvalutor(
    setHasNewChanges,
    () => setOpen(true),
  );

  const disabled = isPending || !question || !code;

  const handleEvaluate = () => {
    if (disabled) return;

    if (!hasNewChanges && feedback) return;

    evaluateCode({ question, answer: code });
  };

  const correctFeedback = feedback as CorrectSolution;
  const incorrectFeedback = feedback as IncorrectSolution;

  // TODO: NOT WORKING
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "'" && e.ctrlKey) {
        e.preventDefault();
        handleEvaluate();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div>
      <div className="flex justify-end gap-x-2">
        <CustomToolTip text="⌘ + '">
          <div>
            <Button
              disableLoader
              disabled={isPending || !hasNewChanges}
              onClick={handleEvaluate}
              className="gap-x-1"
            >
              {isPending ? "Evaluating" : "Evaluate"}
              {isPending && <LoaderDot />}
            </Button>
          </div>
        </CustomToolTip>

        <Button
          disabled={isLoading}
          className="gap-x-1"
          onClick={handleSuccess}
        >
          New Question
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader className="flex flex-col gap-y-2">
            <DialogTitle>Your Feedback 🚀</DialogTitle>

            <div className="grid grid-cols-2 gap-2">
              {isCorrect ? (
                <CorrectFeedback
                  stream={stream}
                  correctFeedback={correctFeedback}
                />
              ) : (
                <IncorrectFeedback
                  stream={stream}
                  incorrectFeedback={incorrectFeedback}
                />
              )}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface CorrectFeedbackProps {
  correctFeedback: CorrectSolution;
  stream: boolean;
}

const CorrectFeedback: React.FC<CorrectFeedbackProps> = ({
  correctFeedback,
  stream,
}) => {
  return (
    <>
      <div className="flex min-h-[200px] flex-col gap-y-2 rounded-xl border p-4 text-[14px]">
        <div className="flex items-center justify-between text-xs font-medium">
          <p>Commendations</p>
          <span>🎉</span>
        </div>

        <div className="flex flex-col gap-y-2">
          {correctFeedback?.commendations.map((commendation, index) => (
            <StreamingMarkdown
              key={index}
              preventStreamReset
              content={commendation}
              speed={stream ? 10 : 0}
            />
          ))}
        </div>
      </div>
      <div className="flex min-h-[200px] flex-col gap-y-2 rounded-xl border p-4 text-[14px]">
        <div className="flex items-center justify-between text-xs font-medium">
          <p>Edge Cases</p>
          <span>🧪</span>
        </div>

        <div className="flex flex-col gap-y-2">
          {correctFeedback?.edge_cases.map((edgeCase, index) => (
            <StreamingMarkdown
              key={index}
              preventStreamReset
              content={edgeCase}
              speed={stream ? 10 : 0}
            />
          ))}
        </div>
      </div>
      <div className="flex min-h-[200px] flex-col gap-y-2 rounded-xl border p-4 text-[14px]">
        <div className="flex items-center justify-between text-xs font-medium">
          <p>Suggestions</p>
          <span>💡</span>
        </div>

        <div className="flex flex-col gap-y-2">
          {correctFeedback?.suggestions.map((suggestion, index) => (
            <StreamingMarkdown
              key={index}
              preventStreamReset
              content={suggestion}
              speed={stream ? 10 : 0}
            />
          ))}
        </div>
      </div>

      <div className="flex min-h-[200px] flex-col gap-y-2 rounded-xl border p-4 text-[14px]">
        <div className="flex items-center justify-between text-xs font-medium">
          <p>Performance Notes</p>
          <span>⚡</span>
        </div>

        <div className="flex flex-col gap-y-2">
          {correctFeedback?.performance_notes.map((performance, index) => (
            <StreamingMarkdown
              key={index}
              preventStreamReset
              content={performance}
              speed={stream ? 10 : 0}
            />
          ))}
        </div>
      </div>
    </>
  );
};

interface IncorrectFeedbackProps {
  incorrectFeedback: IncorrectSolution;
  stream: boolean;
}

const IncorrectFeedback: React.FC<IncorrectFeedbackProps> = ({
  incorrectFeedback,
  stream,
}) => {
  return (
    <>
      <div className="flex min-h-[200px] flex-col gap-y-2 rounded-xl border p-4 text-[14px]">
        <div className="flex items-center justify-between text-xs font-medium">
          <p>Input</p>
          <span>📝</span>
        </div>

        <div className="flex flex-col gap-y-2">
          <StreamingMarkdown
            preventStreamReset
            content={incorrectFeedback.input}
            speed={stream ? 10 : 0}
          />
        </div>
      </div>
      <div className="flex min-h-[200px] flex-col gap-y-2 rounded-xl border p-4 text-[14px]">
        <div className="flex items-center justify-between text-xs font-medium">
          <p>Expected</p>
          <span>🎯</span>
        </div>

        <div className="flex flex-col gap-y-2">
          <StreamingMarkdown
            preventStreamReset
            content={incorrectFeedback.expected}
            speed={stream ? 10 : 0}
          />
        </div>
      </div>
      <div className="flex min-h-[200px] flex-col gap-y-2 rounded-xl border p-4 text-[14px]">
        <div className="flex items-center justify-between text-xs font-medium">
          <p>Output</p>
          <span>❌</span>
        </div>

        <div className="flex flex-col gap-y-2">
          <StreamingMarkdown
            preventStreamReset
            content={incorrectFeedback.output}
            speed={stream ? 10 : 0}
          />
        </div>
      </div>

      <div className="flex min-h-[200px] flex-col gap-y-2 rounded-xl border p-4 text-[14px]">
        <div className="flex items-center justify-between text-xs font-medium">
          <p>Issue</p>
          <span>⚠️</span>
        </div>

        <div className="flex flex-col gap-y-2">
          <StreamingMarkdown
            preventStreamReset
            content={incorrectFeedback.issue}
            speed={stream ? 10 : 0}
          />
        </div>
      </div>
    </>
  );
};
