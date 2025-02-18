import gsap from "gsap";
import { useAtom } from "jotai";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";

import { correctAnswerAtom, wrongAnswerAtom } from "~/atom";

export const TriviaQuestions = () => {
  const [, setToggleCorrectAnswer] = useAtom(correctAnswerAtom);
  const [, setToggleWrongAnswer] = useAtom(wrongAnswerAtom);

  const container = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const [trivia, setTrivia] = useState({
    question:
      "Which programming language was used to control the Apollo 11 mission?",
    options: ["Assembly Language", "Fortran", "COBOL", "C"],
    correctOptionIndex: 0,
  });

  const { contextSafe } = useGSAP(
    () => {
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
    },
    {
      scope: container,
    },
  );

  const handleSelectionOption = contextSafe((selectedOptionIndex: number) => {
    if (trivia.correctOptionIndex !== selectedOptionIndex) {
      setToggleWrongAnswer(true);

      return;
    }

    setToggleCorrectAnswer(true);

    tl.current = gsap
      .timeline()
      .to(".trivia-question", {
        opacity: 0,
        ease: "power4.out",
      })
      .to(".trivia-option", {
        opacity: 0,
        stagger: 0.1,
        ease: "power4.out",
        onComplete: () => {
          // load next trivia questions...

          setTrivia({
            question:
              "Which data structure follows the Last In, First Out (LIFO) principle?",
            options: ["Stack", "Queue", "Linked List", "Heap"],
            correctOptionIndex: 0,
          });
        },
      })
      .to(".trivia-question", {
        opacity: 1,
        ease: "power4.out",
      })
      .to(".trivia-option", {
        opacity: 1,
        stagger: 0.1,
        ease: "power4.out",
      });
  });

  return (
    <div
      ref={container}
      className="relative flex h-full w-full flex-col items-center justify-center gap-y-4 pt-4 text-[14px]"
    >
      <p className="trivia-question opacity-0">{trivia.question}</p>

      <div className="grid w-full max-w-4xl grid-cols-2 gap-2">
        {trivia.options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleSelectionOption(index)}
            className="trivia-option cursor-pointer rounded-xl bg-secondary/20 px-4 py-1.5 opacity-0 transition hover:bg-secondary/40"
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};
