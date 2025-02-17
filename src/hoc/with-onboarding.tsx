import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "~/hooks/use-toast";
import { Gradient } from "~/app/_components/gradient";
import { getOnboardingStatus } from "~/app/_actions/user";
import { LoaderDot } from "~/app/_components/gsap/loader-dot";

export const withOnboarding = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  return function WithOnboarding(props: P) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const handleFetchOnboardingStatus = async () => {
        try {
          setLoading(true);

          const response = await getOnboardingStatus();

          if (!response.ok) {
            router.push("/someother");
          }

          const onboardingStatusRes = response.data;

          if (!onboardingStatusRes) router.push("/onboarding");
        } catch (error) {
          console.log("error", error);
          toast({
            title: "Looks like something is broken.",
            description: "We're working on fixing this issue.",
          });
        } finally {
          setLoading(false);
        }
      };

      void handleFetchOnboardingStatus();
    }, [router]);

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
