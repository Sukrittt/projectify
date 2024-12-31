import { useState } from "react";

import { cn } from "~/lib/utils";
import type { InteractionValues } from "~/types";
import { activityOpts } from "~/app/(screen)/room/_constant";
import { LoaderDot } from "~/app/_components/gsap/loader-dot";

interface WaitingRoomInteractionProps {
  handleActivityClick: (values: string[], value: string) => void;
}

export const WaitingRoomInteraction: React.FC<WaitingRoomInteractionProps> = ({
  handleActivityClick,
}) => {
  const [loading, setLoading] = useState<InteractionValues | null>(null);

  const handleLoadPromise = async (value: InteractionValues) => {
    try {
      setLoading(value);
      await new Promise((resolve) => setTimeout(resolve, 5_000));
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex flex-col items-center gap-y-4">
      <p className="room-interaction-text uppercase text-muted-foreground">
        While you wait
      </p>

      <div className="flex items-center gap-x-2">
        {activityOpts.map((option, index) => (
          <div
            key={index}
            onClick={async () => {
              handleActivityClick(
                activityOpts
                  .filter((opt) => opt.value !== option.value)
                  .map((opt) => `.room-interaction-${opt.value}`),
                option.value,
              );
              await handleLoadPromise(option.value);
            }}
            className={cn(
              `room-interaction-${option.value} flex w-[250px] cursor-pointer flex-col items-center justify-center gap-y-2 rounded-xl border px-4 py-8 transition hover:border-neutral-500`,
              {
                "cursor-default opacity-60 hover:border-border":
                  loading === option.value,
              },
            )}
          >
            {loading === option.value ? (
              <LoaderDot className="my-[9px]" />
            ) : (
              option.icon
            )}
            <p className="text-sm text-muted-foreground">{option.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
