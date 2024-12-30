"use server";
import { currentUser } from "@clerk/nextjs/server";

import apiClient from "~/utils/axios";
import { handleAxiosError } from "~/lib/utils";
import type { ServerActionResponse, RoomData } from "~/types";

export const getRoom = async (): Promise<
  ServerActionResponse<{ id: string; createdAt: Date }>
> => {
  try {
    const user = await currentUser();

    if (!user) {
      return {
        ok: false,
        message: "We couldn't find your account.",
      };
    }

    const response = await apiClient.get(`/room/${user.id}`);

    const { data, message } = response.data as RoomData;

    return {
      ok: true,
      data,
      message,
    };
  } catch (error) {
    return handleAxiosError(error);
  }
};
