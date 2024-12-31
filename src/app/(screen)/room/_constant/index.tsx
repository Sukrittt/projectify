import { ChartSpline, CircleHelp, Gamepad, Lightbulb } from "lucide-react";

import type { InteractionData } from "~/types";

export const activityOpts: InteractionData = [
  {
    label: "Coding Minigames",
    value: "coding-minigames",
    icon: <Gamepad className="h-6 w-6" />,
  },
  {
    label: "Tips and Tricks Showcase",
    value: "tips-and-tricks",
    icon: <Lightbulb className="h-6 w-6" />,
  },
  {
    label: "Trivia Questions",
    value: "trivia",
    icon: <CircleHelp className="h-6 w-6" />,
  },
  {
    label: "Progress Insights",
    value: "progress-insights",
    icon: <ChartSpline className="h-6 w-6" />,
  },
];
