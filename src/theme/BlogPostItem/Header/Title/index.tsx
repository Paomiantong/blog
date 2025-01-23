import React from "react";
import Title from "@theme-original/BlogPostItem/Header/Title";
// @ts-ignore
import { useBlogPost } from "@docusaurus/plugin-content-blog/client";
import styles from "./styles.module.css";

export default function TitleWrapper(props) {
  const { metadata } = useBlogPost();
  const banner = metadata?.frontMatter?.image;
  return (
    <>
      {banner && (
        <img
          src={banner}
          alt="banner"
          className={styles.banner}
          loading="lazy"
        />
      )}
      <Title {...props} />
    </>
  );
}
