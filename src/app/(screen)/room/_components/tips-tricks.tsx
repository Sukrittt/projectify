import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { act, useCallback, useEffect, useRef, useState } from "react";

import { LoaderDot } from "~/app/_components/gsap/loader-dot";

const tips = [
  "Use meaningful variable names to improve code clarity.",
  "Write small, reusable functions to enhance maintainability.",
  "Use version control (Git) and commit frequently with meaningful messages.",
  "Master your IDE shortcuts to speed up development.",
  "Use linters and formatters like ESLint and Prettier for cleaner code.",
  "Optimize loops and conditions by avoiding unnecessary computations.",
  "Write unit tests using frameworks like Jest or Mocha for reliability.",
  "Learn regex to efficiently handle pattern matching and text processing.",
  "Use console.log and debugger breakpoints wisely for better debugging.",
  "Read documentation and explore source code to improve problem-solving skills.",
];

export const TipsAndTricks = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const [activeTipIndex, setActiveTipIndex] = useState(
    Math.floor(Math.random() * tips.length),
  );

  const [loading, setLoading] = useState(false);

  const { contextSafe } = useGSAP(
    () => {
      console.log("container gsap running");

      tl.current = gsap.timeline().to(".tips", {
        opacity: 1,
        ease: "power4.in",
      });
    },
    {
      scope: container,
    },
  );

  const handleShowNextTip = contextSafe(() => {
    let newTipIndex;

    do {
      newTipIndex = Math.floor(Math.random() * tips.length);
    } while (newTipIndex === activeTipIndex);

    tl.current = gsap
      .timeline()
      .to(".tips", {
        opacity: 0,
        ease: "power4.out",
        onComplete: () => {
          setActiveTipIndex(newTipIndex);
        },
      })
      .to(`.tips`, {
        opacity: 1,
        ease: "power4.in",
      });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      handleShowNextTip();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleLoader = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 3_000));
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    void handleLoader();
  }, []);

  return (
    <div
      ref={container}
      className="relative flex h-full w-full items-center justify-center pt-4"
    >
      {loading ? (
        <div className="flex h-full w-full items-center justify-center">
          <LoaderDot dotClassName="bg-black" className="mt-0" />
        </div>
      ) : (
        <p className={`tips text-[14px] opacity-0`}>{tips[activeTipIndex]}</p>
      )}
    </div>
  );
};
