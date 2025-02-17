import { toast } from "sonner";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Gradient } from "~/app/_components/gradient";
import { getOnboardingStatus } from "~/app/_actions/user";
import { LoaderDot } from "~/app/_components/gsap/loader-dot";

export const withOnboarding = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  return function WithOnboarding(props: P) {
    const router = useRouter();
    const pathname = usePathname();

    const [loading, setLoading] = useState(false);
    const isOnboardingPage = pathname === "/onboarding";

    useEffect(() => {
      const handleFetchOnboardingStatus = async () => {
        try {
          setLoading(true);

          const response = await getOnboardingStatus();

          if (!response.ok) {
            router.push("/sign-in");
          }

          const onboardingStatusRes = response.data;

          if (!onboardingStatusRes) {
            router.push("/onboarding");
          } else if (isOnboardingPage) {
            router.push("/");
          }

          setLoading(false);
        } catch (error) {
          console.log("error", error);
          toast.error("Looks like something is broken.", {
            description: "We're working on fixing this issue.",
          });
        }
      };

      void handleFetchOnboardingStatus();
    }, [router, isOnboardingPage]);

    return (
      <>
        {loading ? (
          <div className="grid h-screen place-items-center">
            <div className="flex gap-x-[3px]">
              <Gradient />
              <LoaderDot dotClassName="bg-black" />
            </div>
          </div>
        ) : (
          <WrappedComponent {...props} />
        )}
      </>
    );
  };
};
