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
  const container = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const [feedbackContainer, setFeedbackContainer] = useState(false);

  const { evaluateCode, feedback, isPending } =
    useMiniGameEvalutor(setHasNewChanges);

  const { contextSafe } = useGSAP({
    scope: container,
  });

  const disabled = isPending || !question || !code;

  const handleEvaluate = () => {
    if (disabled) return;

    handleOpenFeedbackContainer();

    if (!hasNewChanges && feedback.length > 0) return;

    // evaluateCode({ question, answer: code });
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
        width: "400px",
        ease: "power4.out",
        paddingTop: "16px",
        paddingBottom: "16px",
      })
      .to(".evaluate-button", {
        height: "400px",
        ease: "power4.out",
      })
      .to(
        ".evaluate-btn-text",
        {
          color: "#fff",
          ease: "power4.out",
        },
        "-=1",
      )
      .to(".evaluate-feedback", {
        opacity: 1,
        display: "block",
        ease: "power4.out",
      });
  });

  const handleCloseFeedbackContainer = contextSafe(() => {
    setFeedbackContainer(false);

    tl.current = gsap
      .timeline()
      .to(".evaluate-button", {
        height: "36px",
        paddingTop: "8px",
        paddingBottom: "8px",
      })
      .to(
        ".evaluate-feedback",
        {
          opacity: 0,
          display: "none",
          ease: "power4.out",
        },
        "-=0.5",
      )
      .to(
        ".evaluate-btn-text",
        {
          color: "#000",
          ease: "power4.out",
        },
        "-=2",
      )
      .to(".evaluate-button", {
        width: "auto",
        borderRadius: "9999px",
        background: "#fafafa",
        ease: "power4.out",
      });
  });

  return (
    <div ref={container} onMouseLeave={handleCloseFeedbackContainer}>
      <div
        onClick={handleEvaluate}
        className={cn(
          "evaluate-button absolute bottom-8 right-8 h-9 cursor-pointer overflow-y-auto rounded-full bg-primary px-4 py-2 text-sm text-black transition hover:bg-primary/90",
          {
            "cursor-default opacity-60": disabled,
            "cursor-default": feedbackContainer,
          },
        )}
      >
        <div className="flex flex-col gap-y-2">
          <div className="evaluate-btn-text flex items-center gap-x-[3px]">
            {isPending
              ? "Evaluating"
              : feedbackContainer
                ? "Feedback"
                : "Evaluate"}
            {isPending && <LoaderDot />}
          </div>

          <Markdown className="evaluate-feedback hidden text-white opacity-0">
            {feedback}
          </Markdown>
        </div>
      </div>
    </div>
  );
};
