import { HydrateClient } from "~/trpc/server";
import { UserProfile } from "./_components/user-profile";

export default function Home() {
  return (
    <HydrateClient>
      <div className="grid h-full grid-cols-11">
        <div className="col-span-8">Coding matchmaking stuff</div>
        <div className="col-span-3 flex flex-col gap-y-2">
          <UserProfile />
        </div>
      </div>
    </HydrateClient>
  );
}
