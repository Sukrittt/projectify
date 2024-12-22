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
        <div className="flex items-start gap-x-4">
          <div id={"onboarding-avatar"}>
            <ReactNiceAvatar
              {...serverData.data.avatarConfig}
              className="h-10 w-10"
              shape="circle"
            />
          </div>

          <p>{serverData.data.firstName + serverData.data.lastName}</p>
        </div>
      ) : (
        <p>No config</p>
      )}
    </div>
  );
};
