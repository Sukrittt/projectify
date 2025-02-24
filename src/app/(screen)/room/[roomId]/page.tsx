type Params = Promise<{ roomId: string }>;

export default async function RoomCompetition({ params }: { params: Params }) {
  const { roomId } = await params;

  return <div>Room - {roomId}</div>;
}
