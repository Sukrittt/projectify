import { HydrateClient } from "~/trpc/server";

import { UserInfo } from "./_components/user-info";

export default function Home() {
  return (
    <HydrateClient>
      <UserInfo />
    </HydrateClient>
  );
}
