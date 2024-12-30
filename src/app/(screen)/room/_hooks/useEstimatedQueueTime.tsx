import { api } from "~/trpc/react";

export const useEstimatedQueueTime = () => {
  return api.room.getEstimatedQueueTime.useQuery();
};
