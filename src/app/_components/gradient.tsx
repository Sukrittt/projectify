import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

export const Gradient = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
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

  return (
    <div ref={container}>
      <div className="gradient-one absolute left-[10%] top-[30%] -z-[99999] h-72 w-72 rounded-full bg-gradient-to-br from-[#CDB4F2] to-transparent blur-2xl" />
      <div className="gradient-two absolute right-[20%] top-[30%] -z-[99999] h-72 w-72 rounded-full bg-gradient-to-br from-pink-300 to-transparent blur-2xl" />
      <div className="gradient-three absolute bottom-[10%] left-[40%] -z-[99999] h-64 w-64 rounded-full bg-gradient-to-br from-yellow-200 to-transparent blur-3xl" />
    </div>
  );
};
