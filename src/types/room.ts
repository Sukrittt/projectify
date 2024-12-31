export type RoomData = {
  data: {
    id: string;
    createdAt: Date;
  };
  message: string;
};

export type InteractionValues =
  | "coding-minigames"
  | "tips-and-tricks"
  | "trivia"
  | "progress-insights";

export type InteractionData = Array<{
  label: string;
  value: InteractionValues;
  icon: React.ReactNode;
}>;
