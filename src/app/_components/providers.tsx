"use client";

import { Toaster } from "~/components/ui/toaster";
import { withOnboarding } from "~/hoc/with-onboarding";
import { FlickeringBackground } from "./flickering-background";

interface ProviderProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProviderProps) => {
  return (
    <>
      <FlickeringBackground />
      <Toaster />

      {children}
    </>
  );
};

export default withOnboarding(Providers);
