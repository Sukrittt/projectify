import { useRouter } from "next/navigation";

import { api } from "~/trpc/react";
import { toast } from "~/hooks/use-toast";

export const useJoinRoom = () => {
  const router = useRouter();
  return api.room.joinRoom.useMutation({
    onSuccess: () => {
      router.push("/room");

      toast({
        title: "Moving to waiting room.",
        description: "Meanwhile help yourself with our warm up challenges.",
      });

      // Start listening to pusher event
    },
  });
};
