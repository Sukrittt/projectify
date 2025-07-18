import Long from "./long";
import Short from "./short";
import Round from "./round";

export default function nose(props: { style: string }) {
  const { style } = props;
  switch (style) {
    case "long":
      return <Long />;
    case "round":
      return <Round />;
    case "short":
    default:
      return <Short />;
  }
}
