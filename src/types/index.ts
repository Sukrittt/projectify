export { type OnboardingStatus } from "./user";

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
