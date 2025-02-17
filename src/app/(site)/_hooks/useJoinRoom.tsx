import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/react";

export const useJoinRoom = () => {
  const router = useRouter();
  return api.room.joinRoom.useMutation({
    onSuccess: () => {
      router.push("/room");

      toast("Moving you to waiting room.", {
        description: "Enjoy our waiting room activities.",
      });

      // Start listening to pusher event
    },
  });
};
