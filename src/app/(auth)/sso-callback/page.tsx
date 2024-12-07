import { type HandleOAuthCallbackParams } from "@clerk/types";

import { SSOCallback } from "~/app/(auth)/_components/sso-callback";

export interface SSOCallbackPageProps {
  searchParams: HandleOAuthCallbackParams;
}

export default async function SSOCallbackPage({
  searchParams,
}: SSOCallbackPageProps) {
  return (
    <div className="grid max-w-lg items-center">
      <SSOCallback searchParams={searchParams} />
    </div>
  );
}
