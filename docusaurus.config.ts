import yaml from "yaml";
import fs from "fs";
import path from "path";

import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const baseUrl = "/blog";
const url = "https://paomiantong.github.io";

const config: Config = {
  title: "小桶",
  tagline: "Dinosaurs are cool",
  favicon: "/favicon.ico",

  // Set the production url of your site here
  url,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "facebook", // Usually your GitHub org/user name.
  projectName: "docusaurus", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "zh-cn",
    locales: ["zh-cn"],
  },

  headTags: [
    {
      tagName: "meta",
      attributes: {
        name: "referrer",
        content: "no-referrer",
      },
    },
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: false,
        pages: false,
        blog: {
          routeBasePath: "/",
          showReadingTime: true,
          blogTitle: "咕咕妙妙屋",
          blogDescription: "ExBucket_ 的博客，啥都会发~",
          blogSidebarCount: 0,
          remarkPlugins: [
            require("./src/extend/remark-spacing"),
            // require("./src/extend/remark-custom-truncate"),
          ],
          //   truncateMarker: /\$--\s*(truncate)\s*--\$/,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        sitemap: {
          lastmod: "date",
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
          filename: "sitemap.xml",
          createSitemapItems: async (params) => {
            const { defaultCreateSitemapItems, ...rest } = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.filter((item) => !item.url.includes("/page/"));
          },
        },
      },
    ],
  ],

  themeConfig: {
    zoom: {
      selector: ".markdown :not(em) > img",
    },
    navbar: {
      title: "My Site",
      // logo: {
      //   alt: "My Site Logo",
      //   src: "/Logo.png",
      // },
      // items: [
      //   { to: "/blog", label: "Blog", position: "left" },
      //   {
      //     href: "https://github.com/facebook/docusaurus",
      //     label: "GitHub",
      //     position: "right",
      //   },
      // ],
    },
    footer: {
      links: [
        {
          title: "Community",
          items: [
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/questions/tagged/docusaurus",
            },
            {
              label: "Discord",
              href: "https://discordapp.com/invite/docusaurus",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/docusaurus",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/facebook/docusaurus",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ExBucket_ Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["bash", "json"],
    },
  } satisfies Preset.ThemeConfig,

  plugins: [
    (context, options) => {
      const authorPath = path.join(context.siteDir, "./blog/authors.yml");
      return {
        name: "global-authors",
        getPathsToWatch() {
          return [authorPath];
        },
        async loadContent() {
          if (fs.existsSync(authorPath)) {
            const authorContent = await fs.promises.readFile(
              authorPath,
              "utf-8",
            );
            return yaml.parse(authorContent);
          }
        },

        async contentLoaded({ content, actions }) {
          if (!content) {
            return;
          }
          actions.setGlobalData(content);
        },
      };
    },
    async (context, options) => {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
    "docusaurus-plugin-image-zoom",
  ],
};

export default config;
