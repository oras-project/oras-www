// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer").themes.github;
const darkCodeTheme = require("prism-react-renderer").themes.dracula;

const TwitterSvg =
    '<svg style="fill: #000000; vertical-align: middle; margin-left: 3px;" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>';

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: "OCI Registry As Storage",
    favicon: "img/favicon.ico",

    // Set the production url of your site here
    url: "https://oras.land",
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: "/",

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: "oras-project", // Usually your GitHub org/user name.
    projectName: "docusaurus", // Usually your repo name.

    onBrokenLinks: "warn",
    onBrokenMarkdownLinks: "warn",

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: "en",
        locales: ["en"],
    },

    stylesheets: [
        //Add Font Awesome stylesheets
        "/fonts/font-awesome/fontawesome.css",
        "/fonts/font-awesome/solid.css",
        "/fonts/font-awesome/regular.css",
        "/fonts/font-awesome/brands.css",
    ],

    presets: [
        [
            "classic",
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve("./sidebars.js"),
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl: "https://github.com/oras-project/oras-www/tree/main/",
                    versions: {
                        "1.1": {
                            label: '1.1',
                            path: '1.1',
                        }
                    }
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        "https://github.com/oras-project/oras-www/tree/main/",
                },
                theme: {
                    customCss: require.resolve("./src/css/custom.css"),
                },
            }),
        ],
    ],
    plugins: [
        [
          'content-docs',
          /** @type {import('@docusaurus/plugin-content-docs').Options} */
          {
            id: 'community',
            path: 'community',
            routeBasePath: 'community',
            sidebarPath: require.resolve("./community/sidebars.js"),
            editCurrentVersion: true,
            showLastUpdateAuthor: true,
            showLastUpdateTime: true,
          },
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            algolia: {
                appId: "KXO9RCDQGX",
                apiKey: "6f21a78a8681d337c3b93995f3291e08",
                indexName: "oras",
                contextualSearch: true,
            },
            announcementBar: {
                id: "announcement_bar",
                content: `⭐ If you like ORAS Project, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/oras-project/oras">GitHub</a> and follow us on <a target="_blank" rel="noopener noreferrer" href="https://x.com/orasproject">${TwitterSvg}</a>`,
                backgroundColor: "var(--theme-card)",
                textColor: "var(--ifm-color-primary)",
                isCloseable: true,
            },
            image: "img/oras_social_card.png",
            navbar: {
                logo: {
                    alt: "ORAS Logo",
                    src: "img/oras.svg",
                },
                items: [
                    {
                        type: "doc",
                        docId: "index",
                        position: "left",
                        label: "Docs",
                    },
                    {
                        to: '/community/community_resources',
                        label: 'Community',
                        position: 'left',
                        activeBaseRegex: `/community/`,
                      },
                    {
                        label: "Adopters",
                        to: "/adopters",
                    },
                    { to: "/blog", label: "Blog", position: "left" },
                    {
                        type: "docsVersionDropdown",
                        position: "right",
                        dropdownActiveClassDisabled: true,
                    },
                    {
                        to: "https://cloud-native.slack.com/archives/CJ1KHJM5Z",
                        label: " ",
                        position: "right",
                        target: "_blank",
                        className: "fab fa-lg fa-slack",
                    },
                    {
                        to: "https://github.com/oras-project",
                        label: " ",
                        position: "right",
                        target: "_blank",
                        className: "fab fa-lg fa-github",
                    },
                    {
                        to: "https://x.com/orasproject",
                        label: " ",
                        position: "right",
                        target: "_blank",
                        className: "fab fa-lg fa-x-twitter",
                    },
                ],
            },
            footer: {
                style: "dark",
                links: [
                    // {
                    //     title: "Docs",
                    //     items: [
                    //         {
                    //             label: "Introduction",
                    //             to: "/docs/",
                    //         },
                    //         {
                    //             label: "Installation",
                    //             to: "/docs/installation",
                    //         },
                    //         {
                    //             label: "How-to Guides",
                    //             to: "/docs/how_to_guides/authentication",
                    //         },
                    //         {
                    //             label: "ORAS Commands",
                    //             to: "/docs/commands/use_oras_cli",
                    //         },
                    //         {
                    //             label: "Client Libraries",
                    //             to: "/docs/client_libraries/overview",
                    //         },
                    //     ],
                    // },
                    {
                        title: "Community",
                        items: [
                            {
                                label: "GitHub",
                                href: "https://github.com/oras-project",
                            },
                            {
                                label: "Slack",
                                href: "https://cloud-native.slack.com/archives/CJ1KHJM5Z",
                            },
                            {
                                label: "X",
                                href: "https://x.com/orasproject",
                            },
                        ],
                    },
                    {
                        title: "More",
                        items: [
                            {
                                label: "Blog",
                                to: "/blog",
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} The Linux Foundation. All rights reserved.<br>The Linux Foundation has registered trademarks and uses trademarks. For a list of trademarks of The Linux Foundation, please see our <a href="https://www.linuxfoundation.org/legal/trademark-usage">Trademark Usage page</a>.`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
        }),
    markdown: {
        mermaid: true,
    },
    themes: ["@docusaurus/theme-mermaid"],
};

module.exports = config;
