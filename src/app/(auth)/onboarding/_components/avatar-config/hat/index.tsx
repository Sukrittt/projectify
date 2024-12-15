import { Ban } from "lucide-react";

import Turban from "./turban";
import Beanie from "./beanie";

export default function hat(props: { color: string; style: string }) {
  const { style, color } = props;
  switch (style) {
    case "beanie":
      return <Beanie color={color} />;
    case "turban":
      return <Turban color={color} />;
    case "none":
      return <Ban className="h-4 w-4" />;
    default:
      return null;
  }
}
