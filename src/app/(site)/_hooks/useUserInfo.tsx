import { api } from "~/trpc/react";

export const useUserInfo = () => {
  return api.user.getUserInfo.useQuery();
};
