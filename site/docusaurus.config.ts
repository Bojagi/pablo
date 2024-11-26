import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import path from 'path';

const config: Config = {
  title: 'Bojagi Pablo',
  tagline: 'Low footprint design system',
  favicon: 'https://bojagi.io/icons/icon-144x144.png?v=b0a76b9ff4200101aff48dfaa1c6ef47',

  // Set the production url of your site here
  url: 'https://bojagi.github.io/pablo',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'bojagi', // Usually your GitHub org/user name.
  projectName: 'pablo', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    [
      'docusaurus-plugin-module-alias',
      {
        alias: {
          '@bojagi/pablo': path.resolve(__dirname, '../src'),
        },
      },
    ],
    [
      'docusaurus-plugin-react-docgen-typescript',
      /** @type {import('docusaurus-plugin-react-docgen-typescript').Options} */
      {
        // pass in a single string or an array of strings
        src: '../src/**/*.tsx',
        // tsConfig: '../tsconfig.json',
        parserOptions: {
          // pass parserOptions to react-docgen-typescript
          // here is a good starting point which filters out all
          // types from react
          propFilter: (prop, component) => {
            if (component.name === 'Avatar') {
              console.log('prop', prop);
            }
            // console.log('component', component);

            if (prop.parent) {
              return !prop.parent.fileName.includes('@types/react');
            }

            return true;
          },
        },
      },
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [],
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: ['@docusaurus/theme-live-codeblock'],

  themeConfig: {
    // Replace with your project's social card
    image: 'https://bojagi.io/icons/icon-144x144.png?v=b0a76b9ff4200101aff48dfaa1c6ef47',
    navbar: {
      title: 'Pablo',
      logo: {
        alt: 'Bojagi Logo',
        src: 'https://bojagi.io/icons/icon-144x144.png?v=b0a76b9ff4200101aff48dfaa1c6ef47',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/bojagi/pablo',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    // footer: {
    //   style: 'dark',
    //   links: [
    //     {
    //       title: 'Docs',
    //       items: [
    //         {
    //           label: 'Components',
    //           to: '/docs/components',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'More',
    //       items: [
    //         {
    //           label: 'GitHub',
    //           href: 'https://github.com/facebook/docusaurus',
    //         },
    //       ],
    //     },
    //   ],
    //   copyright: `Copyright © ${new Date().getFullYear()} Pablo, Inc. Built with Docusaurus.`,
    // },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
