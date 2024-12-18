import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/react";
import { toast } from "~/hooks/use-toast";
import { onboardingStatusAtom } from "~/atom";

export const useUpdateUser = () => {
  const router = useRouter();
  const [, setOnboardingStatus] = useAtom(onboardingStatusAtom);

  return api.user.updateUser.useMutation({
    onSuccess: () => {
      toast({
        title: "Already loving your avatar!",
      });

      router.push("/");
      setOnboardingStatus(true);
    },
  });
};
