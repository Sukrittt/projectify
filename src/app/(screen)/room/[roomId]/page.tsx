interface RoomCompetitionProps {
  params: {
    roomId: string;
  };
}

export default function RoomCompetition({ params }: RoomCompetitionProps) {
  const { roomId } = params;

  return <div>Room - {roomId}</div>;
}
