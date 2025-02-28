import apiClient from "~/utils/axios";
import { type RoomData } from "~/types";
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
  getRoom: privateProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.id;

    const response = await apiClient.get(`/room/${userId}`);

    const { data, message } = response.data as RoomData;

    return {
      ok: true,
      data,
      message,
    };
  }),
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
