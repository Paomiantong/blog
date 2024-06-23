import React from "react";
import type { RFC } from "./type";
const Spoiler: RFC<void> = (props): React.JSX.Element => {
  return <del className="spoiler">{props.children}</del>;
};

export default Spoiler;
