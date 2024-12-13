import { useEffect } from "react";
import { redirect, usePathname } from "next/navigation";

import { toast } from "~/hooks/use-toast";
import { publicRoutes } from "~/constants";
import { getOnboardingStatus } from "~/app/_actions/user";

export const withOnboarding = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  return function WithOnboarding(props: P) {
    const pathname = usePathname();

    useEffect(() => {
      if (publicRoutes.includes(pathname)) return;

      const handleOnboardingRedirection = async () => {
        const response = await getOnboardingStatus();

        if (!response.ok) {
          toast({
            title: "Oops, something went wrong.",
            description: response.message,
          });
        }

        if (!response.data) return;

        //Not yet onboarded
        if (!response.data.status) redirect("/onboarding");
      };

      void handleOnboardingRedirection();
    }, [pathname]);

    return <WrappedComponent {...props} />;
  };
};
