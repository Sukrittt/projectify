import { atom } from "jotai";
import type { AvatarFullConfig } from "react-nice-avatar";

export const onboardingStatusAtom = atom<boolean | undefined>(undefined);

export const avatarConfigAtom =
  atom<Required<AvatarFullConfig | undefined>>(undefined);

export const colorPickerAtom = atom(false);

export const streamAtom = atom(false);
