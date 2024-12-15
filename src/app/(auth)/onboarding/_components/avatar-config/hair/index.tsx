import Thick from "./thick";
import Normal from "./normal";
import Mohawk from "./mohawk";
import WomanLong from "./woman-long";
import WomanShort from "./woman-short";

export default function Hair(props: {
  style: string;
  color: string;
  colorRandom: boolean;
}) {
  const { style, color, colorRandom } = props;

  switch (style) {
    case "thick":
      return <Thick color={color} colorRandom={colorRandom} />;
    case "mohawk":
      return <Mohawk color={color} colorRandom={colorRandom} />;
    case "womanLong":
      return <WomanLong color={color} />;
    case "womanShort":
      return <WomanShort color={color} />;
    case "normal":
    default:
      return <Normal color={color} />;
  }
}
