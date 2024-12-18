import apiClient from "~/utils/axios";
import { updateUserValidator } from "~/zod/user";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  updateUser: privateProcedure
    .input(updateUserValidator)
    .mutation(async ({ ctx, input }) => {
      await apiClient.patch(`/users/${ctx.user.id}`, { data: input });
    }),
});
