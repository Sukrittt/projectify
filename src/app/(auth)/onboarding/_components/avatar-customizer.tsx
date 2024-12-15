"use client";

import { type AvatarFullConfig } from "react-nice-avatar";

import Hat from "./avatar-config/hat";
import Ear from "./avatar-config/ear";
import Hair from "./avatar-config/hair";
import Face from "./avatar-config/face";
import Eyes from "./avatar-config/eyes";
import Nose from "./avatar-config/nose";
import Shirt from "./avatar-config/shirt";
import Mouth from "./avatar-config/mouth";
import Glasses from "./avatar-config/glasses";

interface AvatarCustomize {
  config: Required<AvatarFullConfig | undefined>;
  updateConfig: (key: string, value: any) => void;
}

export const AvatarCustomizer = ({ config, updateConfig }: AvatarCustomize) => {
  if (!config) return null;

  return (
    <div className="flex items-center gap-x-4 rounded-xl bg-neutral-800 px-4 py-2">
      {/* Face color */}
      <SectionWrapper
        onClick={() => updateConfig("faceColor", config.faceColor)}
      >
        <Face color={config.faceColor} />
      </SectionWrapper>

      {/* Hair style */}
      <SectionWrapper
        onClick={() => updateConfig("hairStyle", config.hairStyle)}
      >
        <Hair style={config.hairStyle} color="#fff" colorRandom />
      </SectionWrapper>

      {/* Hat style */}
      <SectionWrapper onClick={() => updateConfig("hatStyle", config.hatStyle)}>
        <Hat style={config.hatStyle} color="#fff" />
      </SectionWrapper>

      {/* Eye style */}
      <SectionWrapper onClick={() => updateConfig("eyeStyle", config.eyeStyle)}>
        <Eyes style={config.eyeStyle} />
      </SectionWrapper>

      {/* Glassse style */}
      <SectionWrapper
        onClick={() => updateConfig("glassesStyle", config.glassesStyle)}
      >
        <Glasses style={config.glassesStyle} />
      </SectionWrapper>

      {/* Ear style */}
      <SectionWrapper onClick={() => updateConfig("earSize", config.earSize)}>
        <Ear size={config.earSize} color="#fff" />
      </SectionWrapper>

      {/* Nose style */}
      <SectionWrapper
        onClick={() => updateConfig("noseStyle", config.noseStyle)}
      >
        <Nose style={config.noseStyle} />
      </SectionWrapper>

      {/* Mouth style */}
      <SectionWrapper
        onClick={() => updateConfig("mouthStyle", config.mouthStyle)}
      >
        <Mouth style={config.mouthStyle} />
      </SectionWrapper>

      {/* Shirt style */}
      <SectionWrapper
        onClick={() => updateConfig("shirtStyle", config.shirtStyle)}
      >
        <Shirt style={config.shirtStyle} color="#fff" />
      </SectionWrapper>
    </div>
  );
};

interface SectionWraperProps {
  children: React.ReactNode;
  onClick: () => void;
}

const SectionWrapper: React.FC<SectionWraperProps> = ({
  children,
  onClick,
}) => {
  return (
    <div
      className="mx-2 h-8 w-8 cursor-pointer rounded-full bg-neutral-700 p-2"
      onClick={onClick}
    >
      <div className="relative h-full w-full">
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};
