"use client";
import { useAtom } from "jotai";
import { useEffect } from "react";
import ReactNiceAvatar, { genConfig } from "react-nice-avatar";

import {
  type DefaultOptions,
  defaultOptions,
} from "~/app/(auth)/onboarding/_config";
import { avatarConfigAtom } from "~/atom";
import { AvatarCustomizer } from "./avatar-customizer";

export const Avatar = () => {
  const [config, setConfig] = useAtom(avatarConfigAtom);

  const updateConfig = (key: string, value: any) => {
    if (!config) return;

    const defaultOpts = genDefaultOptions();

    const opts = defaultOpts[key as keyof DefaultOptions];
    const currentIdx = opts.findIndex((item) => item === value);
    const newIdx = (currentIdx + 1) % opts.length;

    const newConfig = { ...config, [key]: opts[newIdx] };
    setConfig(newConfig);
  };

  const genDefaultOptions = () => {
    const hairSet = new Set([
      ...defaultOptions.hairStyleMan,
      ...defaultOptions.hairStyleWoman,
    ]);

    return {
      ...defaultOptions,
      hairStyle: Array.from(hairSet),
    };
  };

  useEffect(() => {
    const packageConfig = genConfig({
      isGradient: true,
    });

    setConfig(packageConfig);
  }, [setConfig]);

  return (
    <>
      <div id={"onboarding-avatar"} className="mb-10">
        <ReactNiceAvatar
          {...config}
          className="highres:w-80 highres:h-80 h-32 w-32"
          hairColorRandom
          shape="circle"
        />
      </div>

      <AvatarCustomizer config={config} updateConfig={updateConfig} />
    </>
  );
};
