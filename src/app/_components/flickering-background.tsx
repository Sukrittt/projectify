"use client"
import FlickeringGrid from "~/components/ui/flickering-grid";

export const FlickeringBackground = () => {
  return (
    <div className="absolute h-screen w-full overflow-hidden">
      <FlickeringGrid
        className="inset-0 z-0 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
        squareSize={4}
        gridGap={6}
        color="#60A5FA"
        maxOpacity={0.5}
        flickerChance={0.1}
        // height={800}
        // width={800}
      />
    </div>
  );
};
