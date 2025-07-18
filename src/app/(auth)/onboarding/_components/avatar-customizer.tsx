"use client";

import { useAtom } from "jotai";
import { type AvatarFullConfig } from "react-nice-avatar";

import { cn } from "~/lib/utils";
import Hat from "./avatar-config/hat";
import Ear from "./avatar-config/ear";
import Hair from "./avatar-config/hair";
import Face from "./avatar-config/face";
import Eyes from "./avatar-config/eyes";
import Nose from "./avatar-config/nose";
import { colorPickerAtom } from "~/atom";
import Shirt from "./avatar-config/shirt";
import Mouth from "./avatar-config/mouth";
import { SaveConfig } from "./save-config";
import { ColorPicker } from "./color-picker";
import Glasses from "./avatar-config/glasses";
import { Dock, DockIcon } from "~/components/ui/dock";
import { CustomToolTip } from "~/components/ui/custom-tool-tip";

interface AvatarCustomize {
  config: Required<AvatarFullConfig | undefined>;
  updateConfig: (key: string, value: any) => void;
}

export const AvatarCustomizer = ({ config, updateConfig }: AvatarCustomize) => {
  return (
    <div className="relative flex items-center gap-x-4">
      <Dock
        magnification={60}
        distance={100}
        className="doc-container scale-0 bg-transparent opacity-0"
      >
        <DockIcon className="doc-item scale-0 opacity-0">
          <CustomToolTip text="Face">
            <ColorPicker configKey="faceColor">
              {config && (
                <SectionWrapper>
                  <Face color={config.faceColor} />
                </SectionWrapper>
              )}
            </ColorPicker>
          </CustomToolTip>
        </DockIcon>
        <DockIcon className="doc-item scale-0 opacity-0">
          <CustomToolTip text="Hair">
            <ColorPicker configKey="hairColor">
              {config && (
                <SectionWrapper
                  onClick={() => updateConfig("hairStyle", config.hairStyle)}
                >
                  <Hair
                    style={config.hairStyle}
                    color={config.hairColor}
                    colorRandom
                  />
                </SectionWrapper>
              )}
            </ColorPicker>
          </CustomToolTip>
        </DockIcon>
        <DockIcon className="doc-item scale-0 opacity-0">
          <CustomToolTip text="Hat">
            <ColorPicker configKey="hatColor">
              {config && (
                <SectionWrapper
                  onClick={() => updateConfig("hatStyle", config.hatStyle)}
                >
                  <Hat style={config.hatStyle} color={config.hatColor} />
                </SectionWrapper>
              )}
            </ColorPicker>
          </CustomToolTip>
        </DockIcon>
        <DockIcon className="doc-item scale-0 opacity-0">
          <CustomToolTip text="Eyes">
            {config && (
              <SectionWrapper
                onClick={() => updateConfig("eyeStyle", config.eyeStyle)}
              >
                <Eyes style={config.eyeStyle} />
              </SectionWrapper>
            )}
          </CustomToolTip>
        </DockIcon>
        <DockIcon className="doc-item scale-0 opacity-0">
          <CustomToolTip text="Glasses">
            {config && (
              <SectionWrapper
                onClick={() =>
                  updateConfig("glassesStyle", config.glassesStyle)
                }
              >
                <Glasses style={config.glassesStyle} />
              </SectionWrapper>
            )}
          </CustomToolTip>
        </DockIcon>
        <DockIcon className="doc-item scale-0 opacity-0">
          <CustomToolTip text="Ear">
            {config && (
              <SectionWrapper
                onClick={() => updateConfig("earSize", config.earSize)}
              >
                <Ear size={config.earSize} color={config.faceColor} />
              </SectionWrapper>
            )}
          </CustomToolTip>
        </DockIcon>
        <DockIcon className="doc-item scale-0 opacity-0">
          <CustomToolTip text="Nose">
            {config && (
              <SectionWrapper
                onClick={() => updateConfig("noseStyle", config.noseStyle)}
              >
                <Nose style={config.noseStyle} />
              </SectionWrapper>
            )}
          </CustomToolTip>
        </DockIcon>
        <DockIcon className="doc-item scale-0 opacity-0">
          <CustomToolTip text="Mouth">
            {config && (
              <SectionWrapper
                onClick={() => updateConfig("mouthStyle", config.mouthStyle)}
              >
                <Mouth style={config.mouthStyle} />
              </SectionWrapper>
            )}
          </CustomToolTip>
        </DockIcon>
        <DockIcon className="doc-item scale-0 opacity-0">
          <CustomToolTip text="Shirt">
            <ColorPicker configKey="shirtColor">
              {config && (
                <SectionWrapper
                  onClick={() => updateConfig("shirtStyle", config.shirtStyle)}
                >
                  <Shirt style={config.shirtStyle} color={config.shirtColor} />
                </SectionWrapper>
              )}
            </ColorPicker>
          </CustomToolTip>
        </DockIcon>
      </Dock>

      <SaveConfig config={config} />
    </div>
  );
};

interface SectionWraperProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const SectionWrapper: React.FC<SectionWraperProps> = ({
  children,
  onClick,
}) => {
  const [colorPicker] = useAtom(colorPickerAtom);

  return (
    <div
      className={cn("h-8 w-8 cursor-pointer rounded-full bg-secondary p-2", {
        "cursor-default": colorPicker,
      })}
      onClick={() => {
        if (colorPicker) return;

        onClick?.();
      }}
    >
      <div className="relative h-full w-full">
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};
