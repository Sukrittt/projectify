import { useAtom } from "jotai";
import { useState } from "react";
import { SketchPicker } from "react-color";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";

import { avatarConfigAtom, colorPickerAtom } from "~/atom";

import "./styles.css";

interface ColorPickerProps {
  configKey: "faceColor" | "shirtColor" | "hairColor" | "hatColor";
  children: React.ReactNode;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  children,
  configKey,
}) => {
  const [config, setConfig] = useAtom(avatarConfigAtom);

  const [, setColorPicker] = useAtom(colorPickerAtom);
  const [open, setOpen] = useState(false);

  const [color, setColor] = useState(config?.[configKey] ?? undefined);

  const handleColorChange = (hex: string) => {
    if (!config) return;

    const newConfig = { ...config, [configKey]: hex };
    setConfig(newConfig);
  };

  const handleOpenChange = (val: boolean) => {
    setOpen(val);
    setColorPicker(val);
  };

  return (
    <HoverCard open={open} onOpenChange={handleOpenChange}>
      <HoverCardTrigger>
        <>{children}</>
      </HoverCardTrigger>
      <HoverCardContent className="w-full overflow-hidden rounded-xl bg-transparent p-0">
        <SketchPicker
          className="!bg-[#0c1721]"
          color={color ?? undefined}
          onChange={(color) => setColor(color.hex)}
          onChangeComplete={(color) => handleColorChange(color.hex)}
        />
      </HoverCardContent>
    </HoverCard>
  );
};
