import { HydrateClient } from "~/trpc/server";
import { UserProfile } from "./_components/user-profile";
import { FindOpponent } from "./_components/find-opponent";

export default function Home() {
  return (
    <HydrateClient>
      <div className="grid h-full grid-cols-11 pr-4">
        <div className="col-span-8">
          <FindOpponent />
        </div>
        <div className="col-span-3">
          <UserProfile />
        </div>
      </div>
    </HydrateClient>
  );
}
