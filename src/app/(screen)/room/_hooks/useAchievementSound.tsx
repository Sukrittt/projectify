"use client";
import useSound from "use-sound";
import { useEffect } from "react";

const achievementMusic = "/music/complete.mp3";

export const useAchievementSound = () => {
  const [, { sound }] = useSound(achievementMusic, {
    format: ["mp3"],
  });

  useEffect(() => {
    if (!sound) return;

    return () => sound.unload();
  }, [sound]);

  const handlePlaySound = () => {
    sound.play();
  };

  return { handlePlaySound };
};
