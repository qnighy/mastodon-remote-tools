// @ts-check

/**
 * @param env {WebpackEnv}
 * @param argv {WebpackArgv}
 * @return {import("webpack").Configuration}
 */
function config(env, argv) {
  const { mode = "production" } = argv;
  return {
    mode,
    entry: {
      index: "./src/index.ts",
    },
    module: {
      rules: [
        {
          test: /\.([jt]sx?|[cm][jt]s)$/,
          exclude: /[/\\]node_modules[/\\]/,
          use: ["babel-loader"],
        },
        ...esmRulesExt(),
      ],
    },
  };
};
export { config as default };

/**
 * @typedef {{
 *   WEBPACK_BUNDLE: boolean;
 *   WEBPACK_BUILD: boolean;
 *   [key: string]: string | boolean;
 * }} WebpackEnv
 */

/**
 * @typedef {{
 *   mode?: "production" | "development" | "none";
 *   env: WebpackEnv;
 * }} WebpackArgv
 */

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
