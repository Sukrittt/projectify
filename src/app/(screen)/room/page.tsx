import { notFound } from "next/navigation";

import { api } from "~/trpc/server";
import { type RoomData } from "~/types";
import { RoomContainer } from "./_components/room-container";

export default async function Room() {
  const serverData = await api.room.getRoom();

  const { data: room } = serverData;

  if (!room) notFound();

  return <RoomContainer room={serverData as RoomData} />;
}
