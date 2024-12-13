"use client";
import { useClerk, useUser } from "@clerk/nextjs";

import { createAvatar } from "@dicebear/core";
import { botttsNeutral } from "@dicebear/collection";

import { Button } from "~/components/ui/button";

export const UserInfo = () => {
  const { user } = useUser();
  const { signOut } = useClerk();

  const avatar = createAvatar(botttsNeutral, {
    seed: "Aneka", // and Felix
    flip: true,
    scale: 70,
    radius: 20, //fixed
    // backgroundColor: ["000", "fff"],
    // backgroundType: ["gradientLinear"],
    backgroundRotation: [0, 180],
    // translateX: -10,
    // translateY: -10,
    eyes: ["frame2"],
    mouth: ["diagram"],
  });

  const uri = avatar.toDataUri();

  return (
    <div>
      <p>
        {user ? user.emailAddresses?.[0]?.emailAddress : "No session found"}
      </p>

      {user && <Button onClick={() => signOut()}>Sign Out</Button>}
    </div>
  );
};
