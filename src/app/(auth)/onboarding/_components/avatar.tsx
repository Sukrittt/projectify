"use client";
import gsap from "gsap";
import { useAtom } from "jotai";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import ReactNiceAvatar, { genConfig } from "react-nice-avatar";

import {
  type DefaultOptions,
  defaultOptions,
} from "~/app/(auth)/onboarding/_config";
import { avatarConfigAtom } from "~/atom";
import { Intro } from "~/app/_components/music/intro";
import { AvatarCustomizer } from "./avatar-customizer";

export const Avatar = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

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

  useGSAP(
    () => {
      tl.current = gsap
        .timeline()
        .to(".intro-text", {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power1.out",
        })
        .to(
          ".intro-text",
          {
            opacity: 0,
            ease: "power1.out",
          },
          "+=3",
        )
        .to(
          ".main-avatar",
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power1.out",
          },
          "+=1",
        )
        .to(".doc-container", {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power1.out",
          stagger: 0.1,
        })
        .to(".doc-item", {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power1.out",
          stagger: 0.1,
        });
    },
    {
      scope: container,
    },
  );

  useEffect(() => {
    const packageConfig = genConfig({
      isGradient: true,
    });

    setConfig(packageConfig);
  }, [setConfig]);

  return (
    <div
      ref={container}
      className="flex flex-col items-center justify-center gap-y-10"
    >
      <Intro />

      <div id={"onboarding-avatar"}>
        <ReactNiceAvatar
          {...config}
          className="highres:w-80 highres:h-80 main-avatar h-40 w-40 opacity-0"
          hairColorRandom
          shape="circle"
        />
      </div>

      <AvatarCustomizer config={config} updateConfig={updateConfig} />
    </div>
  );
};
