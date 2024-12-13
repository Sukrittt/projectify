"use server";

import { currentUser } from "@clerk/nextjs/server";

import apiClient from "~/utils/axios";
import { handleAxiosError } from "~/lib/utils";
import type { ServerActionResponse, OnboardingStatus } from "~/types";

export const getOnboardingStatus = async (): Promise<
  ServerActionResponse<OnboardingStatus>
> => {
  try {
    const user = await currentUser();

    if (!user) {
      return {
        ok: false,
        message: "No user was found.",
      };
    }

    const response = await apiClient.get(
      `/users/${user.id}/getOnboardingStatus`,
    );

    const data = response.data as OnboardingStatus;

    return {
      ok: true,
      data,
      message: "Successfully fetched onboarding status",
    };
  } catch (error: any) {
    return handleAxiosError(error);
  }
};
