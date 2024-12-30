import apiClient from "~/utils/axios";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

type RoomPayload = {
  data: { id: string };
  message: string;
};

type QueuTimePayload = {
  data: number;
  message: string;
};

export const roomRouter = createTRPCRouter({
  joinRoom: privateProcedure.mutation(async ({ ctx }) => {
    const response = await apiClient.post(`/room/join`, {
      clerkId: ctx.user.id,
    });

    const { data, message } = response.data as RoomPayload;

    return {
      ok: true,
      data,
      message,
    };
  }),
  getEstimatedQueueTime: privateProcedure.query(async ({ ctx }) => {
    const response = await apiClient.get(
      `/room/getEstimatedQueueTime/${ctx.user.id}`,
    );

    const { data, message } = response.data as QueuTimePayload;

    return {
      ok: true,
      data,
      message,
    };
  }),
});
