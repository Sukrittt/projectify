"use client";
import useSound from "use-sound";
import { useEffect } from "react";

const introMusic = "/music/dimension-intro.mp3";

export const Intro = () => {
  const [, { sound }] = useSound(introMusic, {
    format: ["mp3"],
  });

  useEffect(() => {
    if (!sound) return;

    sound.play();

    return () => sound.unload();
  }, [sound]);

  return (
    <p className="intro-text absolute z-50 translate-y-[50px] text-[14px] opacity-0">
      Meet the developers of the world.
    </p>
  );
};
