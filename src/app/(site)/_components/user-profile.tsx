"use client";

import ReactNiceAvatar from "react-nice-avatar";

import { useUserInfo } from "~/app/(site)/_hooks/useUserInfo";
import { LoaderDot } from "~/app/_components/gsap/loader-dot";

export const UserProfile = () => {
  const { data: serverData, isLoading } = useUserInfo();

  return (
    <div>
      {isLoading ? (
        <div className="flex gap-x-[3px]">
          Loading
          <LoaderDot />
        </div>
      ) : serverData ? (
        <div className="flex justify-end gap-x-2">
          {/* <div id={"onboarding-avatar"}>
            <ReactNiceAvatar
              {...serverData.data.avatarConfig}
              className="h-6 w-6"
            />
          </div> */}

          <div className="flex flex-col items-end justify-end gap-x-4">
            <p className="text-sm">
              {serverData.data.firstName.charAt(0).toUpperCase() +
                serverData.data.firstName.slice(1).toLowerCase()}
              &rsquo;s workspace{" "}
            </p>

            <span className="text-xs text-muted-foreground">Level #1</span>

            {/* <p className="text-sm text-muted-foreground">
              Level <span className="text-foreground">#1</span>
            </p> */}
          </div>
        </div>
      ) : (
        <p>No config</p>
      )}
    </div>
  );
};
