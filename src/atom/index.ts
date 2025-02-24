import { atom } from "jotai";
import type { AvatarFullConfig } from "react-nice-avatar";

export const avatarConfigAtom =
  atom<Required<AvatarFullConfig | undefined>>(undefined);

export const colorPickerAtom = atom(false);

export const streamAtom = atom(false);

export const correctAnswerAtom = atom(false);
export const wrongAnswerAtom = atom(false);

export const showCountdownAtom = atom(false);
