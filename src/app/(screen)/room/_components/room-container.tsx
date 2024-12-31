"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";

import type { RoomData } from "~/types";
import { Button } from "~/components/ui/button";
import { LoaderDot } from "~/app/_components/gsap/loader-dot";
import { WaitingRoomInteraction } from "./waiting-room-interaction";
import { useEstimatedQueueTime } from "~/app/(screen)/room/_hooks/useEstimatedQueueTime";

interface RoomContainerProps {
  room: RoomData;
}

export const RoomContainer: React.FC<RoomContainerProps> = ({ room }) => {
  const container = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const { contextSafe } = useGSAP({
    scope: container,
  });

  const handleActivityClick = contextSafe((values: string[], value: string) => {
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
        value,
        {
          opacity: 0,
          ease: "power4.out",
        },
        "-=0.25",
      );
  });

  return (
    <div ref={container}>
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
              dotClassName="bg-black"
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
          <div className="flex h-6 w-fit items-center justify-center rounded-lg bg-slate-800 px-2">
            {serverData.data?.toFixed(0) ?? 0}s
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-x-2">
          <p>Calculating estimated queue time</p>
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-800 opacity-60">
            <LoaderDot className="pb-3" />
          </div>
        </div>
      )}
    </div>
  );
};

interface TimerTrackerProps {
  createdAt: Date;
}

const TimeTracker: React.FC<TimerTrackerProps> = ({ createdAt }) => {
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

  return <p className="text-sm">{formatTime(time)}</p>;
};
