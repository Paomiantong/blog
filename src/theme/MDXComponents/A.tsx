import Link from "@docusaurus/Link";
import type { Props } from "@theme/MDXComponents/A";
import React from "react";

import { Icon } from "@iconify/react";

export default function MDXA(props: Props): React.JSX.Element {
  const href = props.href;

  if (!href) return <Link {...props} />;

  const iconMappings = {
    "github.com": { icon: "simple-icons:github" },
    "twitter.com": { icon: "logos:twitter" },
    "zhihu.com": { icon: "simple-icons:zhihu", color: "#1772F6" },
    "bilibili.com": {
      icon: "simple-icons:bilibili",
      color: "#00AEEC",
    },
  };

  const foundKey = Object.keys(iconMappings).find((key) => {
    const prefixRegex = new RegExp(`^https?://${key}`);
    return prefixRegex.test(href);
  });

  const iconSet = foundKey ? iconMappings[foundKey] : { icon: null };

  const { icon, color } = iconSet;
  return (
    <span style={{ display: "inline-flex", gap: "0.25rem" }}>
      {icon && (
        <Icon
          className="a-icon"
          style={{ alignSelf: "center", color }}
          icon={icon}
          width={16}
          height={16}
        />
      )}
      <Link {...props} />
      <Icon
        style={{ alignSelf: "center" }}
        className="a-icon"
        icon="mingcute:external-link-line"
        width={16}
        height={16}
      />
    </span>
  );

  //   return <Link {...props} />;
}
