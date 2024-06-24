import React, { type FC } from "react";

import styles from "./styles.module.css";
import { cn } from "@site/src/utils";

export interface KbdProps {
  k: string | string[];
}

const Kbd: FC<KbdProps> = (props): React.JSX.Element => {
  if (typeof props.k === "string") {
    return <span className={cn(styles.kbd, "align-middle")}>{props.k}</span>;
  }
  const keys = props.k.map((key, index, array) => (
    <React.Fragment key={index}>
      <span className={styles.kbd}>{key}</span>
      {index < array.length - 1 && <span>+</span>}
    </React.Fragment>
  ));
  return <span className="inline-flex gap-1 align-middle">{keys}</span>;
};

export default Kbd;
