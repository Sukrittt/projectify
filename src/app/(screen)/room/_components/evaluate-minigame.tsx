import { useAtom } from "jotai";
import { useState } from "react";

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
import { useMiniGameEvalutor } from "~/app/(screen)/room/_hooks/useMiniGameEvalutor";
import { CorrectSolution, IncorrectSolution } from "~/types";

interface EvaluateMinigameProps {
  question: string;
  code: string;
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
}) => {
  const [stream] = useAtom(streamAtom);

  const [open, setOpen] = useState(true);

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

  console.log("feedback", feedback);

  const formattedFeedback = isCorrect
    ? (feedback as CorrectSolution)
    : (feedback as IncorrectSolution);

  return (
    <div>
      <div className="flex justify-end">
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Your Feedback 🚀</DialogTitle>
            {/* <StreamingMarkdown
                preventStreamReset
                content={feedback}
                speed={stream ? 10 : 0}
              /> */}

            <div className="grid grid-cols-2 gap-4">
              {isCorrect ? (
                <>
                  <div>
                    <p>Commendations</p>

                    <div></div>
                  </div>
                  <div>
                    <p>Suggestions</p>
                  </div>
                  <div>
                    <p>Edge Cases</p>
                  </div>
                  <div>Can Proceed</div>
                </>
              ) : (
                <>
                  <div>incorrect</div>
                  <div></div>
                  <div></div>
                  <div></div>
                </>
              )}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
