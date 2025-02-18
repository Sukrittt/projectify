import gsap from "gsap";
import { useAtom } from "jotai";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";

import { correctAnswerAtom, wrongAnswerAtom } from "~/atom";

export const Gradient = () => {
  const [wrongAnswer, setWrongAnswer] = useAtom(wrongAnswerAtom);
  const [correctAnswer, setCorrectAnswer] = useAtom(correctAnswerAtom);

  const container = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      const duration = 10;
      const radius = 100; // Radius of the semicircle
      const centerX = 200; // Center of motion
      const centerY = 100;

      tl.current = gsap
        .timeline()
        .to(".gradient-one", {
          duration,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
          onUpdate: function () {
            const progress = this.progress(); // Get animation progress (0 to 1)
            const angle = Math.PI * progress + Math.PI; // Shift range from π to 2π

            const x = centerX + radius * Math.sin(angle); // Left curve
            const y = centerY + radius * Math.cos(angle); // Flip y motion

            gsap.set(".gradient-one", { x, y });
          },
        })
        .to(
          ".gradient-two",
          {
            duration,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
            onUpdate: function () {
              const progress = this.progress(); // Get animation progress (0 to 1)
              const angle = Math.PI * progress + Math.PI; // Shift range from π to 2π

              const x = centerX - radius * Math.sin(angle); // Left curve
              const y = centerY - radius * Math.cos(angle); // Flip y motion

              gsap.set(".gradient-two", { x, y });
            },
          },
          `-=${duration}`,
        )
        .to(
          ".gradient-three",
          {
            duration,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
            onUpdate: function () {
              const progress = this.progress(); // Get animation progress (0 to 1)
              const angle = Math.PI * progress - Math.PI / 2; // Shift range from -π/2 to π/2

              const x = centerX + radius * Math.sin(angle); // Left curve
              const y = centerY + radius * Math.cos(angle); // Flip y motion

              gsap.set(".gradient-three", { x, y });
            },
          },
          `-=${duration}`,
        );
    },
    {
      scope: container,
    },
  );

  const animateColor = contextSafe(
    (element: string, toColor: string, duration = 0.6) => {
      gsap.to(element, {
        background: `radial-gradient(circle, ${toColor} 0%, transparent 100%)`,
        duration,
        ease: "power2.inOut",
      });
    },
  );

  useEffect(() => {
    if (!correctAnswer) return;

    animateColor(".gradient-one", "rgba(34, 197, 94, 0.8)");
    animateColor(".gradient-two", "rgba(34, 197, 94, 0.8)");
    animateColor(".gradient-three", "rgba(34, 197, 94, 0.8)");

    const timer = setTimeout(() => {
      animateColor(".gradient-one", "#CDB4F2");
      animateColor(".gradient-two", "rgb(251, 207, 232)");
      animateColor(".gradient-three", "rgb(253, 230, 138)");

      setCorrectAnswer(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [correctAnswer]);

  useEffect(() => {
    if (!wrongAnswer) return;

    animateColor(".gradient-one", "rgba(239, 68, 68, 0.8)");
    animateColor(".gradient-two", "rgba(239, 68, 68, 0.8)");
    animateColor(".gradient-three", "rgba(239, 68, 68, 0.8)");

    const timer = setTimeout(() => {
      animateColor(".gradient-one", "#CDB4F2");
      animateColor(".gradient-two", "rgb(251, 207, 232)");
      animateColor(".gradient-three", "rgb(253, 230, 138)");

      setWrongAnswer(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [wrongAnswer]);

  return (
    <div ref={container}>
      <div className="gradient-one absolute left-[10%] top-[30%] -z-[99999] h-72 w-72 rounded-full bg-gradient-to-br from-[#CDB4F2] to-transparent blur-2xl transition" />
      <div className="gradient-two absolute right-[20%] top-[20%] -z-[99999] h-72 w-72 rounded-full bg-gradient-to-br from-pink-300 to-transparent blur-2xl transition" />
      <div className="gradient-three absolute bottom-[20%] left-[40%] -z-[99999] h-64 w-64 rounded-full bg-gradient-to-br from-yellow-200 to-transparent blur-3xl transition" />
    </div>
  );
};
