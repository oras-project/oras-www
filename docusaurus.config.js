// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'OCI Registry As Storage',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://oras.land',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'oras-project', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  stylesheets: [
    //Add Font Awesome stylesheets
    '/fonts/font-awesome/fontawesome.css',
    '/fonts/font-awesome/solid.css',
    '/fonts/font-awesome/regular.css',
    '/fonts/font-awesome/brands.css'
  ],


  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/asmitbm/oras-website/tree/main/',
          lastVersion: 'current',
          versions: {
            current: {
              label: '1.0.0',
              path: '1.0.0',
            },
          },
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/asmitbm/oras-website/tree/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        logo: {
          alt: 'ORAS Logo',
          src: 'img/oras.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'index',
            position: 'left',
            label: 'Docs',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            type: 'docsVersionDropdown',
            position: 'right',
            dropdownActiveClassDisabled: true,
          },
          {
            to: 'https://cloud-native.slack.com/archives/CJ1KHJM5Z',
            label: ' ',
            position: 'right',
            target: '_blank',
            className: 'fab fa-lg fa-slack',
          },
          {
            to: 'https://github.com/oras-project',
            label: ' ',
            position: 'right',
            target: '_blank',
            className: 'fab fa-lg fa-github',
          },
          {
            to: 'https://twitter.com/orasproject',
            label: ' ',
            position: 'right',
            target: '_blank',
            className: 'fab fa-lg fa-twitter',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Introduction',
                to: '/docs/index',
              },
              {
                label: 'CLI',
                to: '/docs/CLI',
              },
              {
                label: 'CLI Reference',
                to: '/docs/CLI_Reference/',
              },
              {
                label: 'Client Libraries',
                to: '/docs/Client_Libraries/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/oras-project',
              },
              {
                label: 'Slack',
                href: 'https://cloud-native.slack.com/archives/CJ1KHJM5Z',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/orasproject',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} ORAS Project`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
