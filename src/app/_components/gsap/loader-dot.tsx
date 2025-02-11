"use client";
import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import { cn } from "~/lib/utils";

interface LoaderDotProps {
  className?: string;
  dotClassName?: string;
}

export const LoaderDot: React.FC<LoaderDotProps> = ({
  className,
  dotClassName,
}) => {
  const container = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      tl.current = gsap.timeline().to(".loader-dot", {
        opacity: 1,
        stagger: 0.1,
        repeat: -1,
      });
    },
    {
      scope: container,
    },
  );

  return (
    <div
      ref={container}
      className={cn("mt-auto flex items-end gap-x-1 pb-1", className)}
    >
      <div
        className={cn(
          "loader-dot h-[2px] w-[2px] rounded-full bg-black opacity-0",
          dotClassName,
        )}
      />
      <div
        className={cn(
          "loader-dot h-[2px] w-[2px] rounded-full bg-black opacity-0",
          dotClassName,
        )}
      />
      <div
        className={cn(
          "loader-dot h-[2px] w-[2px] rounded-full bg-black opacity-0",
          dotClassName,
        )}
      />
    </div>
  );
};
