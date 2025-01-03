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

export type CodingMinigamePayload = {
  previousQuestions: PreviousQuestion[];
  tiers: Tier[];
  user: {
    name: string;
    language: string;
    profileRank: number;
    tierLevel: string;
  };
};

type Tier = { name: string; description: string; tierRange: string };

type PreviousQuestion = {
  question: string;
  questionType: string;
};
