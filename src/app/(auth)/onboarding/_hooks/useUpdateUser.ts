import { useRouter } from "next/navigation";

import { api } from "~/trpc/react";
import { toast } from "~/hooks/use-toast";

export const useUpdateUser = () => {
  const router = useRouter();

  return api.user.updateUser.useMutation({
    onSuccess: () => {
      toast({
        title: "Already loving your avatar!",
      });

      router.push("/");
    },
  });
};
