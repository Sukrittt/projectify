import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default async function SSOCallbackPage() {
  return <AuthenticateWithRedirectCallback />;
}
