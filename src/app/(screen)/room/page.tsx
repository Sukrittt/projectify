import { notFound } from "next/navigation";

import { type RoomData } from "~/types";
import { getRoom } from "./_actions/room";
import { RoomContainer } from "./_components/room-container";

export default async function Room() {
  const serverData = await getRoom();

  const { data: room } = serverData;

  if (!room) notFound();

  return <RoomContainer room={serverData as RoomData} />;
}
