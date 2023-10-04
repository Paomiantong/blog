// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const yaml = require("yaml");
const fs = require("fs");
const path = require("path");

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const baseUrl = "/blog";
const url = "https://paomiantong.github.io";

/** @type {import('@docusaurus/types').Config} */
const config = {
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
      ({
        // docs: {
        //   sidebarPath: require.resolve("./sidebars.js"),
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        // },
        docs: false,
        pages: false,
        blog: {
          routeBasePath: "/",
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          //   editUrl:
          //     "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
          blogTitle: "摸鱼小站",
          blogDescription: "ExBucket_ 的博客，啥都会发~",
          blogSidebarTitle: "最近的文章",
          blogSidebarCount: 0,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      //   image: "img/docusaurus-social-card.jpg",
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
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),

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
              "utf-8"
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
  ],
};

module.exports = config;
