import { useAtom } from "jotai";
import { useEffect } from "react";
import { redirect, usePathname } from "next/navigation";

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
      if (publicRoutes.includes(pathname)) {
        setOnboardingStatus(false);
        return;
      }

      const handleOnboardingRedirection = async () => {
        if (onboardingStatus !== undefined) {
          if (!onboardingStatus) redirect("/onboarding");
          else redirect("/");
        }

        const response = await getOnboardingStatus();

        if (response.data === undefined) {
          setOnboardingStatus(false);
          redirect("/sign-in");
        }

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
        {onboardingStatus === undefined && false ? (
          <div className="grid h-screen place-items-center">Loading...</div>
        ) : (
          <WrappedComponent {...props} />
        )}
      </>
    );
  };
};
