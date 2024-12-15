"use client";
import { useClerk, useUser } from "@clerk/nextjs";

import { Button } from "~/components/ui/button";

export const UserInfo = () => {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <div>
      <p>
        {user ? user.emailAddresses?.[0]?.emailAddress : "No session found"}
      </p>

      {user && <Button onClick={() => signOut()}>Sign Out</Button>}
    </div>
  );
};
