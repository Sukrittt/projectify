"use client";

import { Button } from "~/components/ui/button";
import { useJoinRoom } from "~/app/(site)/_hooks/useJoinRoom";

export const FindOpponent = () => {
  const { mutate: joinRoom, isPending } = useJoinRoom();

  return (
    <Button disabled={isPending} onClick={() => joinRoom()} className="gap-x-1">
      {isPending ? "Finding" : "Find"} Opponent
    </Button>
  );
};
