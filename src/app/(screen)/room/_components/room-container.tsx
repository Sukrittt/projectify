"use client";
import { useEffect, useState } from "react";
import { ChartSpline, CircleHelp, Gamepad, Lightbulb } from "lucide-react";

import type { RoomData } from "~/types";
import { Button } from "~/components/ui/button";
import { LoaderDot } from "~/app/_components/gsap/loader-dot";
import { useEstimatedQueueTime } from "~/app/(screen)/room/_hooks/useEstimatedQueueTime";

interface RoomContainerProps {
  room: RoomData;
}

export const RoomContainer: React.FC<RoomContainerProps> = ({ room }) => {
  return (
    <div className="grid h-screen place-items-center">
      <div className="flex w-full max-w-2xl flex-col items-center gap-y-4">
        <div className="flex w-full items-center justify-between">
          <TimeTracker createdAt={room.data.createdAt} />
          <EstimatedQueueTime />
        </div>

        <Button className="w-full gap-x-[3px]" disabled dotClassName="bg-black">
          Searching
        </Button>

        <Button variant="secondary" className="w-full">
          Cancel
        </Button>

        <WaitingRoomInteractionOpts />
      </div>
    </div>
  );
};

const WaitingRoomInteractionOpts = () => {
  const options = [
    {
      label: "Coding Minigames",
      icon: <Gamepad className="h-6 w-6" />,
    },
    {
      label: "Tips and Tricks Showcase",
      icon: <Lightbulb className="h-6 w-6" />,
    },
    {
      label: "Trivia Questions",
      icon: <CircleHelp className="h-6 w-6" />,
    },
    {
      label: "Progress Insights",
      icon: <ChartSpline className="h-6 w-6" />,
    },
  ];

  return (
    <div className="flex flex-col items-center gap-y-4 pt-4">
      <p className="uppercase text-muted-foreground">While you wait</p>

      <div className="flex items-center gap-x-2">
        {options.map((option, index) => (
          <div
            key={index}
            className="flex w-[250px] cursor-pointer flex-col items-center justify-center gap-y-2 rounded-xl border px-4 py-8 transition hover:border-neutral-500"
          >
            {option.icon}
            <p className="text-sm text-muted-foreground">{option.label}</p>
          </div>
        ))}
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
            {serverData.data?.toFixed(0) ?? 0} s
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
