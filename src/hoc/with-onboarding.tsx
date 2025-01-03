import { useAtom } from "jotai";
import { useEffect } from "react";
import { redirect, usePathname } from "next/navigation";

import { publicRoutes } from "~/constants";
import { onboardingStatusAtom } from "~/atom";
import { useMounted } from "~/hooks/use-mounted";
import { getOnboardingStatus } from "~/app/_actions/user";
import { LoaderDot } from "~/app/_components/gsap/loader-dot";

export const withOnboarding = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  return function WithOnboarding(props: P) {
    const pathname = usePathname();
    const [onboardingStatus, setOnboardingStatus] =
      useAtom(onboardingStatusAtom);

    const mounted = useMounted();

    useEffect(() => {
      if (publicRoutes.includes(pathname)) {
        setOnboardingStatus(false);
        return;
      }

      const handleOnboardingRedirection = async () => {
        if (onboardingStatus !== undefined) {
          if (!onboardingStatus) redirect("/onboarding");
          else if (pathname === "/onboarding") redirect("/");

          return;
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
    }, [pathname, mounted, setOnboardingStatus]);

    return (
      <>
        {!mounted || onboardingStatus === undefined ? (
          <div className="grid h-screen place-items-center">
            <div className="flex gap-x-[3px]">
              Loading
              <LoaderDot />
            </div>
          </div>
        ) : (
          <WrappedComponent {...props} />
        )}
      </>
    );
  };
};
