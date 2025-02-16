import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";

import { useTips } from "~/app/(screen)/room/_hooks/useTips";
import { LoaderDot } from "~/app/_components/gsap/loader-dot";

export const TipsAndTricks = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const [, setVisitedTipIndexes] = useState<number[]>([]);

  const { data: tips, isLoading } = useTips();

  const [activeTipIndex, setActiveTipIndex] = useState(
    Math.floor(Math.random() * (tips?.data?.length ?? 0)),
  );

  const { contextSafe } = useGSAP(
    () => {
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
    if (!tips) return;

    const totalTips = tips.data.length;

    setVisitedTipIndexes((prev) => {
      const visitedSet = new Set(prev);

      // Reset if all tips are visited
      if (visitedSet.size === totalTips - 1) {
        visitedSet.clear();
      }

      let newTipIndex;
      do {
        newTipIndex = Math.floor(Math.random() * totalTips);
      } while (visitedSet.has(newTipIndex) || newTipIndex === activeTipIndex);

      visitedSet.add(newTipIndex);

      tl.current = gsap
        .timeline()
        .to(".tips", {
          opacity: 0,
          ease: "power4.out",
          onComplete: () => {
            setActiveTipIndex(newTipIndex);
            setVisitedTipIndexes(Array.from(visitedSet));
          },
        })
        .to(".tips", {
          opacity: 1,
          ease: "power4.in",
        });

      return Array.from(visitedSet);
    });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      handleShowNextTip();
    }, 5000);

    return () => clearInterval(interval);
  }, [handleShowNextTip]);

  return (
    <div
      ref={container}
      className="relative flex h-full w-full items-center justify-center pt-4"
    >
      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <LoaderDot dotClassName="bg-black" className="mt-0" />
        </div>
      ) : (
        <p className={`tips text-[14px] opacity-0`}>
          {tips?.data[activeTipIndex]}
        </p>
      )}
    </div>
  );
};
