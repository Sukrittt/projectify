import type {
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
} from "~/types";

export interface DefaultOptions {
  sex: Sex[];
  faceColor: string[];
  earSize: EarSize[];
  hairColor: string[];
  hairStyleMan: HairStyleMan[];
  hairStyleWoman: HairStyleWoman[];
  hatColor: string[];
  hatStyle: HatStyle[];
  eyeBrowWoman: EyeBrowStyle[];
  eyeStyle: EyeStyle[];
  glassesStyle: GlassesStyle[];
  noseStyle: NoseStyle[];
  mouthStyle: MouthStyle[];
  shirtStyle: ShirtStyle[];
  shirtColor: string[];
  bgColor: string[];
  gradientBgColor: string[];
}

export const defaultOptions: DefaultOptions = {
  sex: ["man", "woman"],
  faceColor: ["#F9C9B6", "#AC6651"],
  earSize: ["small", "big"],
  hairColor: [
    "#000",
    "#fff",
    "#77311D",
    "#FC909F",
    "#D2EFF3",
    "#506AF4",
    "#F48150",
  ],
  hairStyleMan: ["normal", "thick", "mohawk"],
  hairStyleWoman: ["normal", "womanLong", "womanShort"],
  hatColor: [
    "#000",
    "#fff",
    "#77311D",
    "#FC909F",
    "#D2EFF3",
    "#506AF4",
    "#F48150",
  ],
  hatStyle: ["beanie", "turban", "none"],
  eyeBrowWoman: ["up", "upWoman"],
  eyeStyle: ["circle", "oval", "smile"],
  glassesStyle: ["round", "square", "none"],
  noseStyle: ["short", "long", "round"],
  mouthStyle: ["laugh", "smile", "peace"],
  shirtStyle: ["hoody", "short", "polo"],
  shirtColor: ["#9287FF", "#6BD9E9", "#FC909F", "#F4D150", "#77311D"],
  bgColor: [
    "#9287FF",
    "#6BD9E9",
    "#FC909F",
    "#F4D150",
    "#E0DDFF",
    "#D2EFF3",
    "#FFEDEF",
    "#FFEBA4",
    "#506AF4",
    "#F48150",
    "#74D153",
  ],
  gradientBgColor: [
    "linear-gradient(45deg, #178bff 0%, #ff6868 100%)",
    "linear-gradient(45deg, #176fff 0%, #68ffef 100%)",
    "linear-gradient(45deg, #ff1717 0%, #ffd368 100%)",
    "linear-gradient(90deg, #36cd1c 0%, #68deff 100%)",
    "linear-gradient(45deg, #3e1ccd 0%, #ff6871 100%)",
    "linear-gradient(45deg, #1729ff 0%, #ff56f7 100%)",
    "linear-gradient(45deg, #56b5f0 0%, #45ccb5 100%)",
  ],
};
