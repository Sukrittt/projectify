"use client";

import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useClerk } from "@clerk/nextjs";

import { type SSOCallbackPageProps } from "~/app/(auth)/sso-callback/page";

export function SSOCallback({ searchParams }: SSOCallbackPageProps) {
  const { handleRedirectCallback } = useClerk();

  useEffect(() => {
    void handleRedirectCallback(searchParams);
  }, [searchParams, handleRedirectCallback]);

  return (
    <div
      role="status"
      aria-label="Loading"
      aria-describedby="loading-description"
      className="grid h-screen place-items-center"
    >
      <Loader2 className="h-8 w-8 animate-spin" aria-hidden="true" />
    </div>
  );
}
