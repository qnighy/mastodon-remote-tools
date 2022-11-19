// @ts-check

const path = require("node:path");

/** @type {import("@storybook/core-common").StorybookConfig} */
const config = {
  core: {
    builder: "@storybook/builder-webpack5",
  },
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  webpackFinal(config, _options) {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        extensionAlias: {
          ...config.resolve?.extensionAlias,
          '.js': [
            '.ts',
            '.tsx',
            '.jsx',
            ...config.resolve?.extensionAlias?.[".js"] ?? ['.js'],
          ],
          '.cjs': [
            '.cts',
            ...config.resolve?.extensionAlias?.[".cjs"] ?? ['.cjs'],
          ],
          '.mjs': [
            '.mts',
            ...config.resolve?.extensionAlias?.[".mjs"] ?? ['.mjs'],
          ],
        },
      },
      module: {
        ...config.module,
        rules: [
          ...config.module?.rules ?? [],
          {
            include: __dirname,
            resolve: {
              fullySpecified: false,
            },
          },
          ...esmRulesExt(),
        ],
      },
    };
  }
};
module.exports = config;

/**
 * @return {import("webpack").RuleSetRule[]}
 */
function esmRulesExt() {
  /** @type {import("webpack").RuleSetRule} */
  const esm = {
    type: "javascript/esm",
    resolve: {
      byDependency: {
        esm: {
          fullySpecified: true,
        },
      },
    },
  };
  /** @type {import("webpack").RuleSetRule} */
  const commonjs = {
    type: "javascript/dynamic",
  };
  return [
    {
      test: /\.mts$/i,
      ...esm,
    },
    {
      test: /\.(jsx|ts|tsx)$/i,
      descriptionData: {
        type: "module",
      },
      ...esm,
    },
    {
      test: /\.cts$/i,
      ...commonjs,
    },
    {
      test: /\.(jsx|ts|tsx)$/i,
      descriptionData: {
        type: "commonjs",
      },
      ...commonjs,
    },
  ];
};
