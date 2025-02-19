import gsap from "gsap";
import { useAtom } from "jotai";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";

import type { TriviaPayload } from "~/types";
import { correctAnswerAtom, wrongAnswerAtom } from "~/atom";
import { LoaderDot } from "~/app/_components/gsap/loader-dot";
import { useSideCannons } from "~/app/(screen)/room/_hooks/useSideCannons";
import { useTriviaQuestions } from "~/app/(screen)/room/_hooks/useTriviaQuestions";
import { useAchievementSound } from "~/app/(screen)/room/_hooks/useAchievementSound";

export const TriviaQuestions = () => {
  const [, setToggleCorrectAnswer] = useAtom(correctAnswerAtom);
  const [, setToggleWrongAnswer] = useAtom(wrongAnswerAtom);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<
    number | undefined
  >(undefined);

  const container = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const { data: triviaQuestions, isLoading } = useTriviaQuestions();

  const { handlePlaySound } = useAchievementSound();

  const [activeTrivia, setActiveTrivia] = useState<
    TriviaPayload["trivia"][number] | null
  >(null);

  const { contextSafe } = useGSAP(undefined, {
    scope: container,
  });

  const { handleFireConfetti } = useSideCannons();

  const startTriviaAnimation = contextSafe(() => {
    tl.current = gsap
      .timeline()
      .to(".trivia-question", {
        opacity: 1,
        duration: 1,
        ease: "power4.out",
      })
      .to(".trivia-option", {
        opacity: 1,
        duration: 2,
        stagger: 0.1,
        ease: "power4.out",
      });
  });

  const handleSelectionOption = contextSafe((selectedOptionIndex: number) => {
    if (!triviaQuestions) return;

    if (activeTrivia?.correctOptionIndex !== selectedOptionIndex) {
      setToggleWrongAnswer(true);
      return;
    }

    setToggleCorrectAnswer(true);

    if ((currentQuestionIndex ?? 0) + 1 === triviaQuestions.data.length - 1) {
      tl.current = gsap
        .timeline()
        .to(".trivia-question", {
          opacity: 0,
          ease: "power4.out",
          onComplete: () => {
            setCurrentQuestionIndex((prev) => (prev ?? 0) + 1);
          },
        })
        .to(
          ".trivia-option",
          {
            opacity: 0,
            stagger: 0.1,
            ease: "power4.out",
          },
          "-=1",
        )
        .to(
          ".trivia-question",
          {
            opacity: 1,
            ease: "power4.out",
            onComplete: () => {
              handleFireConfetti();
              handlePlaySound();
            },
          },
          "+=2",
        );
      return;
    }

    tl.current = gsap
      .timeline()
      .to(".trivia-question", {
        opacity: 0,
        ease: "power4.out",
        onComplete: () => {
          if (currentQuestionIndex === undefined) return;

          setActiveTrivia(
            triviaQuestions?.data?.[currentQuestionIndex + 1] ?? null,
          );

          setCurrentQuestionIndex((prev) => (prev ?? 0) + 1);
        },
      })
      .to(
        ".trivia-option",
        {
          opacity: 0,
          stagger: 0.1,
          ease: "power4.out",
        },
        "-=1",
      )
      .to(
        ".trivia-question",
        {
          opacity: 1,
          ease: "power4.out",
        },
        "+=2",
      )
      .to(".trivia-option", {
        opacity: 1,
        stagger: 0.1,
        ease: "power4.out",
      });
  });

  useEffect(() => {
    if (!triviaQuestions?.data || activeTrivia) return;

    setActiveTrivia(triviaQuestions?.data?.[0] ?? null);
    setCurrentQuestionIndex(0);
    startTriviaAnimation();
  }, [triviaQuestions, startTriviaAnimation, activeTrivia]);

  const hasReachedLastIndex =
    triviaQuestions &&
    currentQuestionIndex === triviaQuestions?.data.length - 1;

  return (
    <div
      ref={container}
      className="relative flex h-full w-full flex-col items-center justify-center gap-y-4 pt-4 text-[14px]"
    >
      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <LoaderDot dotClassName="bg-black" className="mt-0" />
        </div>
      ) : (
        <>
          <p className="trivia-question opacity-0">
            {hasReachedLastIndex
              ? "Good. You're all set 🚀."
              : activeTrivia?.question}
          </p>

          <div className="grid w-full max-w-4xl grid-cols-2 gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                onClick={() => handleSelectionOption(index)}
                className="trivia-option cursor-pointer rounded-xl bg-secondary/20 px-4 py-1.5 opacity-0 transition hover:bg-secondary/40"
              >
                {activeTrivia?.options[index]}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
