import { Fragment } from "react";

import EarBig from "./big";
import EarSmall from "./small";

export default function ear(props: { color: string; size: string }) {
  const { color, size } = props;
  return (
    <Fragment>
      {size === "small" && <EarSmall color={color} />}
      {size === "big" && <EarBig color={color} />}
    </Fragment>
  );
}
