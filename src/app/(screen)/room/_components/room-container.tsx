"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";

import type {
  ExtendedEventUser,
  InteractionData,
  RoomData,
  RoomEvent,
} from "~/types";
import { cn } from "~/lib/utils";
import { pusherClient } from "~/lib/pusher";
import { PUSHER_CHANNELS } from "~/constants";
import { TipsAndTricks } from "./tips-tricks";
import { MatchDetails } from "./match-details";
import { Button } from "~/components/ui/button";
import { CodingMiniGame } from "./coding-minigame";
import { TriviaQuestions } from "./trivia-questions";
import { activityOpts } from "~/app/(screen)/room/_constant";
import { LoaderDot } from "~/app/_components/gsap/loader-dot";
import { WaitingRoomInteraction } from "./waiting-room-interaction";
import { useEstimatedQueueTime } from "~/app/(screen)/room/_hooks/useEstimatedQueueTime";

interface RoomContainerProps {
  room: RoomData;
}

export const RoomContainer: React.FC<RoomContainerProps> = ({ room }) => {
  const container = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const [opponent, setOpponent] = useState<ExtendedEventUser | null>(null);

  const [isClosing, setIsClosing] = useState(false);

  const [activity, setActivity] = useState<InteractionData[number] | null>(
    null,
  );

  const { contextSafe } = useGSAP({
    scope: container,
  });

  const handleActivityClick = contextSafe((values: string[], value: string) => {
    const currentActivity =
      activityOpts.find((opt) => opt.value === value) ?? null;

    setActivity(currentActivity);
    setIsClosing(false);

    tl.current = gsap
      .timeline()
      .to(".room-controls", {
        opacity: 0,
        ease: "power4.in",
      })
      .to(
        ".room-interaction-text",
        {
          opacity: 0,
          ease: "power4.in",
        },
        "-=0.5",
      )
      .to(
        values,
        {
          opacity: 0,
          ease: "power4.out",
          stagger: 0.1,
          reversed: true,
        },
        "-=0.5",
      )
      .to(
        `.room-interaction-${value}`,
        {
          opacity: 0,
          ease: "power4.out",
        },
        "-=0.25",
      )
      .to(".room-activity-container", {
        y: 0,
        ease: "power4.out",
        duration: 0.1,
      })
      .fromTo(
        ".activity-content",
        {
          opacity: 0,
          stagger: 0.1,
          ease: "power4.out",
        },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "power4.out",
        },
      );
  });

  const handleActivityClose = contextSafe(() => {
    setActivity(null);
    setIsClosing(true);

    tl.current = gsap
      .timeline()
      .to(".activity-content", {
        opacity: 0,
        stagger: 0.1,
        ease: "power4.out",
      })
      .to(".room-activity-container", {
        y: "-100%",
        ease: "power4.out",
        duration: 0.1,
      })
      .to(".room-controls", {
        opacity: 1,
        ease: "power4.in",
      })
      .to(
        ".room-interaction-text",
        {
          opacity: 1,
          ease: "power4.in",
        },
        "-=0.5",
      )
      .to(
        activityOpts.map((opt) => `.room-interaction-${opt.value}`),
        {
          opacity: 1,
          ease: "power4.out",
          stagger: 0.1,
          reversed: true,
        },
        "-=0.5",
      );
  });

  const handleMatchFinished = contextSafe((user?: ExtendedEventUser) => {
    console.log("match found", user);

    const activityValues = activityOpts.map(
      (opt) => `.room-interaction-${opt.value}`,
    );

    tl.current = gsap
      .timeline()
      .to(".room-controls", {
        opacity: 0,
        ease: "power4.in",
      })
      .to(
        ".room-interaction-text",
        {
          opacity: 0,
          ease: "power4.in",
        },
        "-=0.5",
      )
      .to(
        activityValues,
        {
          opacity: 0,
          ease: "power4.out",
          stagger: 0.1,
          reversed: true,
        },
        "-=0.5",
      )
      .to(".room-activity-container", {
        y: 0,
        ease: "power4.out",
        duration: 0.1,
      })
      .fromTo(
        ".activity-content",
        {
          opacity: 0,
          stagger: 0.1,
          ease: "power4.out",
        },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "power4.out",
        },
      );
  });

  //pusher
  useEffect(() => {
    pusherClient.subscribe(`user-${room.data.userId}-room`);

    const matchmakingHandler = (event: RoomEvent) => {
      if (event.type === "match-found" && event.user) {
        setOpponent({ ...event.user, competitionId: event.competitionId });
      }

      handleMatchFinished(event.user);
    };

    pusherClient.bind(PUSHER_CHANNELS.MATCH_MAKING, matchmakingHandler); //listen to this event

    return () => {
      pusherClient.unsubscribe(`user-${room.data.userId}-room`);
      pusherClient.unbind(PUSHER_CHANNELS.MATCH_MAKING, matchmakingHandler);
    };
  }, [room.data.userId]);

  return (
    <div ref={container}>
      <div
        className={cn(
          "room-activity-container absolute -z-40 h-screen w-full",
          {
            "z-50": !!activity || !!opponent,
          },
        )}
      >
        <div className="relative flex h-full flex-col gap-y-4 p-8">
          <Button
            variant="secondary"
            onClick={handleActivityClose}
            disabled={isClosing || !activity}
            className={cn(
              "activity-content absolute bottom-8 left-8 z-50 gap-x-[3px]",
              {
                "opacity-0": !activity,
              },
            )}
          >
            {isClosing ? "Closing" : "Close"}
          </Button>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-4">
              <div className="activity-content">
                {activity?.icon ?? <LoaderDot />}
              </div>
              <p className="activity-content">{activity?.label}</p>

              <span
                className={cn("activity-content", {
                  "opacity-0": !activity,
                })}
              >
                |
              </span>

              <TimeTracker
                createdAt={room.data.createdAt}
                className={cn("activity-content text-muted-foreground", {
                  "opacity-0": !activity,
                })}
              />
            </div>

            <div className="flex items-center gap-x-4">
              <Button variant="secondary" className="activity-content w-full">
                Cancel
              </Button>

              <Button
                disabled
                dotClassName="bg-white"
                className="activity-content gap-x-[3px]"
              >
                Searching
              </Button>
            </div>
          </div>

          {/* Activity Content */}
          <div className="activity-content h-full">
            {activity?.value === "coding-minigames" && <CodingMiniGame />}
            {activity?.value === "tips-and-tricks" && <TipsAndTricks />}
            {activity?.value === "trivia" && <TriviaQuestions />}

            {opponent && (
              <MatchDetails opponent={opponent} roomId={room.data.id} />
            )}
          </div>
        </div>
      </div>

      <div className="grid h-screen place-items-center">
        <div className="flex w-full max-w-2xl flex-col items-center gap-y-8">
          <div className="room-controls flex w-full flex-col gap-y-4">
            <div className="flex w-full items-center justify-between">
              <TimeTracker createdAt={room.data.createdAt} />
              <EstimatedQueueTime />
            </div>

            <Button
              className="w-full gap-x-[3px]"
              disabled
              dotClassName="bg-white"
            >
              Searching
            </Button>

            <Button variant="secondary" className="w-full">
              Cancel
            </Button>
          </div>

          <WaitingRoomInteraction handleActivityClick={handleActivityClick} />
        </div>
      </div>
    </div>
  );
};

const EstimatedQueueTime = () => {
  const { data: serverData, isLoading } = useEstimatedQueueTime();

  return (
    <div className="text-sm">
      {!isLoading && serverData ? (
        <div className="flex items-center gap-x-2">
          <p>Estimated Queue Time</p>
          <div className="flex h-6 w-fit items-center justify-center rounded-lg bg-secondary px-2">
            {serverData.data?.toFixed(0) ?? 0}s
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-x-2">
          <p>Calculating estimated queue time</p>
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-secondary opacity-60">
            <LoaderDot className="pb-3" />
          </div>
        </div>
      )}
    </div>
  );
};

interface TimerTrackerProps {
  createdAt: Date;
  className?: string;
}

const TimeTracker: React.FC<TimerTrackerProps> = ({ createdAt, className }) => {
  const [time, setTime] = useState(() =>
    Math.floor((Date.now() - new Date(createdAt).getTime()) / 1000),
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(Math.floor((Date.now() - new Date(createdAt).getTime()) / 1000));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [createdAt]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return <p className={cn("text-sm", className)}>{formatTime(time)}</p>;
};
