"use client";

import { Gradient } from "./gradient";
import { Toaster } from "~/components/ui/toaster";
import { withOnboarding } from "~/hoc/with-onboarding";

interface ProviderProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProviderProps) => {
  return (
    <>
      <Toaster />
      <Gradient />

      {children}
    </>
  );
};

export default withOnboarding(Providers);
