"use server";

import { currentUser } from "@clerk/nextjs/server";

import apiClient from "~/utils/axios";
import { handleAxiosError } from "~/lib/utils";
import type { ServerActionResponse, UserAvatar } from "~/types";

export const getOnboardingStatus = async (): Promise<
  ServerActionResponse<boolean>
> => {
  try {
    const user = await currentUser();

    if (!user) {
      return {
        ok: false,
        message: "We couldn't find your account.",
      };
    }

    const response = await apiClient.get(
      `/users/${user.id}?attributes=avatarConfig`,
    );

    const { data, message } = response.data as UserAvatar;

    return {
      ok: true,
      data: !!data.avatarConfig,
      message,
    };
  } catch (error: any) {
    return handleAxiosError(error);
  }
};
