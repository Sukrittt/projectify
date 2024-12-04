import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <p className="py-16 text-center text-7xl">Developer Competitions</p>
    </HydrateClient>
  );
}
