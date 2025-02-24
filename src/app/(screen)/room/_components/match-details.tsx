import gsap from "gsap";
import { useAtom } from "jotai";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";
import ReactNiceAvatar from "react-nice-avatar";
import { useEffect, useRef, useState } from "react";

import { showCountdownAtom } from "~/atom";
import { type ExtendedEventUser } from "~/types";

interface MatchDetailsProps {
  roomId: string;
  opponent: ExtendedEventUser;
}

export const MatchDetails: React.FC<MatchDetailsProps> = ({
  opponent,
  roomId,
}) => {
  const router = useRouter();

  const container = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const [showCountdown, setShowCountdown] = useAtom(showCountdownAtom);
  const [currentCount, setCurrentCount] = useState(5);

  const { contextSafe } = useGSAP(
    () => {
      tl.current = gsap.timeline().to(".match-details", {
        opacity: 1,
        ease: "power4.in",
        stagger: 0.1,
      });
    },
    {
      scope: container,
    },
  );

  const handleShowNextText = contextSafe((onComplete: () => void) => {
    tl.current = gsap
      .timeline()
      .to(".countdown", {
        opacity: 0,
        ease: "power4.out",
        duration: 0.5,
        onComplete: () => {
          onComplete?.();
        },
      })
      .to(".countdown", {
        opacity: 1,
        ease: "power4.in",
        duration: 0.5,
      });
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      handleShowNextText(() => setShowCountdown(true));
    }, 5_000);

    return () => clearTimeout(timer);
  }, [handleShowNextText]);

  useEffect(() => {
    if (!showCountdown) return;

    const timer = setInterval(() => {
      if (currentCount === 0) {
        router.push(`/room/${roomId}`);
        return;
      }

      handleShowNextText(() => setCurrentCount(currentCount - 1));
    }, 2_000);

    return () => clearInterval(timer);
  }, [showCountdown, handleShowNextText]);

  return (
    <div
      ref={container}
      className="flex h-full w-full flex-col items-center justify-center gap-y-4"
    >
      <div className="flex flex-col items-center gap-y-4">
        <div id={"profile-avatar"}>
          <ReactNiceAvatar
            className="match-details h-40 w-40 opacity-0"
            {...JSON.parse(opponent.avatar)}
          />
        </div>

        <div className="flex flex-col items-center gap-y-4">
          <div className="flex flex-col items-center">
            <p className="match-details font-medium opacity-0">
              {opponent.name}
            </p>

            <div className="flex items-center gap-x-2">
              <span className="match-details text-xs text-muted-foreground opacity-0">
                #{opponent.language}
              </span>

              <span className="match-details text-xs text-muted-foreground opacity-0">
                #profile-rank-{opponent.profileRank}
              </span>

              <span className="match-details text-xs text-muted-foreground opacity-0">
                #{opponent.tierLevel}
              </span>
            </div>
          </div>

          <span className="match-details countdown text-xs text-muted-foreground opacity-0">
            {showCountdown ? `Starting in ${currentCount}` : "Opponent Found"}
          </span>
        </div>
      </div>
    </div>
  );
};
