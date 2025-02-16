export type { UserAvatar, UserInfo } from "./user";

export type {
  Sex,
  EarSize,
  HairStyleMan,
  HairStyleWoman,
  HatStyle,
  EyeStyle,
  GlassesStyle,
  NoseStyle,
  MouthStyle,
  ShirtStyle,
  EyeBrowStyle,
} from "./avatar";

export type ServerActionResponse<T> = {
  ok: boolean;
  data?: T;
  message: string;
};

export type {
  RoomData,
  InteractionData,
  InteractionValues,
  CodingMinigamePayload,
} from "./room";

export type { CorrectSolution, IncorrectSolution, TipsPayload } from "./ai";
