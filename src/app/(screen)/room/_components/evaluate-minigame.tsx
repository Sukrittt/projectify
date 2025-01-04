import gsap from "gsap";
import Markdown from "react-markdown";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";

import { cn } from "~/lib/utils";
import { LoaderDot } from "~/app/_components/gsap/loader-dot";
import { useMiniGameEvalutor } from "~/app/(screen)/room/_hooks/useMiniGameEvalutor";

interface EvaluateMinigameProps {
  question: string;
  code: string;
  handleSuccess: () => void;
}

export const EvaluateMinigame: React.FC<EvaluateMinigameProps> = ({
  question,
  code,
  handleSuccess,
}) => {
  const container = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const [feedbackContainer, setFeedbackContainer] = useState(false);

  const { evaluateCode, feedback, isPending } = useMiniGameEvalutor();

  const { contextSafe } = useGSAP({
    scope: container,
  });

  const disabled = isPending || !question || !code;

  const handleEvaluate = () => {
    if (disabled) return;

    handleOpenFeedbackContainer();

    evaluateCode({ question, answer: code });
  };

  const handleOpenFeedbackContainer = contextSafe(() => {
    if (feedbackContainer) return;

    setFeedbackContainer(true);

    tl.current = gsap
      .timeline()
      .to(".evaluate-button", {
        background: "#1f2931",
        borderRadius: "20px",
        opacity: 1,
        duration: 0.1,
      })
      .to(".evaluate-button", {
        height: "400px",
        width: "400px",
      });
  });

  const handleCloseFeedbackContainer = contextSafe(() => {
    setFeedbackContainer(false);

    tl.current = gsap
      .timeline()
      .to(".evaluate-button", {
        background: "#fafafa",
        borderRadius: "9999px",
        duration: 0.1,
      })
      .to(".evaluate-button", {
        height: "36px",
        width: "fit-content",
      });
  });

  return (
    <div ref={container}>
      <div
        onClick={handleEvaluate}
        className={cn(
          "evaluate-button absolute bottom-8 right-8 h-9 cursor-pointer overflow-y-auto rounded-full bg-primary px-4 py-2 text-sm text-black transition hover:bg-primary/90",
          {
            "cursor-default opacity-60": disabled,
            "py-4": feedbackContainer,
          },
        )}
      >
        <div className="flex flex-col gap-y-2">
          <div className="flex items-center justify-between">
            <div
              className={cn("flex items-center gap-x-[3px]", {
                "text-white": feedbackContainer,
              })}
            >
              {isPending
                ? "Evaluating"
                : feedbackContainer
                  ? "Feedback"
                  : "Evaluate"}
              {isPending && <LoaderDot />}
            </div>

            {feedbackContainer && (
              <span
                onClick={handleCloseFeedbackContainer}
                className="text-xs text-white"
              >
                Close
              </span>
            )}
          </div>

          {feedbackContainer && (
            <Markdown className="text-white">{feedback}</Markdown>
          )}
        </div>
      </div>
    </div>
  );
};
