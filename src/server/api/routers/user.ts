import apiClient from "~/utils/axios";
import { type OnboardingStatus } from "~/types/user";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getOnboardingStatus: privateProcedure.query(async ({ ctx }) => {
    const response = await apiClient.get(
      `/users/${ctx.user.id}/getOnboardingStatus`,
    );

    const data = response.data as OnboardingStatus;

    return data.status;
  }),
});
