export type RoomData = {
  data: {
    id: string;
    createdAt: Date;
    userId: string;
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

type UserPayload = {
  name: string;
  language: string;
  profileRank: number;
  tierLevel: string;
};

export type CodingMinigamePayload = {
  previousQuestions: PreviousQuestion[];
  tiers: Tier[];
  user: UserPayload;
};

type Tier = { name: string; description: string; tierRange: string };

type PreviousQuestion = {
  question: string;
  questionType: string;
};

export type ExtendedEventUser = UserPayload & { avatar: string };

export type RoomEvent = {
  type: "match-found" | "match-not-found";
  user?: ExtendedEventUser;
};
