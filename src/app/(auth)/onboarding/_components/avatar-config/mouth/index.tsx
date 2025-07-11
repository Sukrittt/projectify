import Laugh from "./laugh";
import Smile from "./smile";
import Peace from "./peace";

export default function mouth(props: { style: string }) {
  const { style } = props;
  switch (style) {
    case "laugh":
      return <Laugh />;
    case "smile":
      return <Smile />;
    case "peace":
    default:
      return <Peace />;
  }
}
