"use client";

import { useUserInfo } from "~/app/(site)/_hooks/useUserInfo";
import { Skeleton } from "~/components/ui/skeleton";

export const UserProfile = () => {
  const { data: serverData, isLoading } = useUserInfo();

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-end">
          <div className="flex w-full flex-col items-end justify-end gap-y-1">
            <Skeleton className="h-4 w-1/2" />

            <Skeleton className="h-4 w-1/3" />

            {/* <p className="text-sm text-muted-foreground">
              Level <span className="text-foreground">#1</span>
            </p> */}
          </div>
        </div>
      ) : (
        serverData && (
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
        )
      )}
    </div>
  );
};
