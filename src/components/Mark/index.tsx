import React from "react";
import type { RFC } from "../type";
import "./styles.module.css";

const Mark: RFC<void> = (props): React.JSX.Element => {
  return (
    <mark className="rounded-md">
      <span className="px-1">{props.children}</span>
    </mark>
  );
};

export default Mark;
