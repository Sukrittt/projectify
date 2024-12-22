import apiClient from "~/utils/axios";
import { type UserInfo } from "~/types";
import { updateUserValidator } from "~/zod/user";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  updateUser: privateProcedure
    .input(updateUserValidator)
    .mutation(async ({ ctx, input }) => {
      await apiClient.patch(`/users/${ctx.user.id}`, { data: input });
    }),
  getUserInfo: privateProcedure.query(async ({ ctx }) => {
    const response = await apiClient.get(
      `/users/${ctx.user.id}?attributes=avatarConfig,firstName,lastName`,
    );

    const { data, message } = response.data as UserInfo;

    return {
      ok: true,
      data: {
        ...data,
        avatarConfig: JSON.parse(data.avatarConfig),
      },
      message,
    };
  }),
});
