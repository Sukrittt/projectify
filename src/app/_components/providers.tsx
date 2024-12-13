"use client";

import { Toaster } from "~/components/ui/toaster";
import { withOnboarding } from "~/hoc/with-onboarding";

interface ProviderProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProviderProps) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};

export default withOnboarding(Providers);
