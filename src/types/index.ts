export { type OnboardingStatus } from "./user";

export type ServerActionResponse<T> = {
  ok: boolean;
  data?: T;
  message: string;
};
