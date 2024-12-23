"use client";

import ReactNiceAvatar from "react-nice-avatar";

import { useUserInfo } from "~/app/(site)/_hooks/useUserInfo";

export const UserProfile = () => {
  const { data: serverData, isLoading } = useUserInfo();

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : serverData ? (
        <div className="flex justify-end gap-x-4">
          <div id={"onboarding-avatar"}>
            <ReactNiceAvatar
              {...serverData.data.avatarConfig}
              className="h-12 w-12"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-lg">
              {serverData.data.firstName + " " + serverData.data.lastName}
            </p>
            <p className="text-sm text-muted-foreground">
              Level <span className="text-foreground">#1</span>
            </p>
          </div>
        </div>
      ) : (
        <p>No config</p>
      )}
    </div>
  );
};
