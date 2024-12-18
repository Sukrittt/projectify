import { useAtom } from "jotai";
import { useEffect } from "react";
import { redirect, usePathname } from "next/navigation";

import { toast } from "~/hooks/use-toast";
import { publicRoutes } from "~/constants";
import { onboardingStatusAtom } from "~/atom";
import { getOnboardingStatus } from "~/app/_actions/user";

export const withOnboarding = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  return function WithOnboarding(props: P) {
    const pathname = usePathname();
    const [onboardingStatus, setOnboardingStatus] =
      useAtom(onboardingStatusAtom);

    useEffect(() => {
      if (publicRoutes.includes(pathname)) return;

      const handleOnboardingRedirection = async () => {
        if (onboardingStatus !== undefined) {
          if (!onboardingStatus) redirect("/onboarding");
          else redirect("/");
        }

        const response = await getOnboardingStatus();

        if (!response.ok) {
          toast({
            title: "Oops, something went wrong.",
            description: response.message,
          });
        }

        if (response.data === undefined) return;

        const onboardingStatusRes = response.data;
        setOnboardingStatus(onboardingStatusRes);

        if (pathname !== "/onboarding") {
          // Not yet onboarded
          if (!onboardingStatusRes) redirect("/onboarding");
        } else {
          // Already onboarded
          if (onboardingStatusRes) redirect("/");
        }
      };

      void handleOnboardingRedirection();
    }, [pathname, setOnboardingStatus]);

    return (
      <>
        {onboardingStatus === undefined ? (
          <div className="grid h-screen place-items-center">Loading...</div>
        ) : (
          <WrappedComponent {...props} />
        )}
      </>
    );
  };
};
