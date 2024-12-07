"use client";

import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { type HandleOAuthCallbackParams } from "@clerk/types";

import { useClerk } from "@clerk/nextjs";

interface SSOCallbackProps {
  searchParams: HandleOAuthCallbackParams;
}

export function SSOCallback({ searchParams }: SSOCallbackProps) {
  const { handleRedirectCallback } = useClerk();

  useEffect(() => {
    const handleSSOCallback = async () => {
      await handleRedirectCallback(searchParams);
    };

    void handleSSOCallback();
  }, [searchParams, handleRedirectCallback]);

  return (
    <div
      role="status"
      aria-label="Loading"
      aria-describedby="loading-description"
      className="grid h-screen w-screen place-items-center"
    >
      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
    </div>
  );
}
