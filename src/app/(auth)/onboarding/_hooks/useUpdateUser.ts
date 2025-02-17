import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/react";

export const useUpdateUser = () => {
  const router = useRouter();

  return api.user.updateUser.useMutation({
    onSuccess: () => {
      toast.success("Already loving your avatar!");
      router.push("/");
    },
  });
};
