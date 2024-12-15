import { atom } from "jotai";
import type { AvatarFullConfig } from "react-nice-avatar";

export const avatarConfigAtom =
  atom<Required<AvatarFullConfig | undefined>>(undefined);
