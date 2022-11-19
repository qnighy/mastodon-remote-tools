// @ts-check

/** @type {import("@babel/core").TransformOptions} */
const config = {
  // @ts-expect-error missing hoisted targets now
  targets: "defaults, not ie 11, not ie_mob 11",
  presets: [
    "@babel/env",
    ["@babel/react", { runtime: "automatic" }],
    ["@babel/typescript", { allowDeclareFields: true }],
  ],
  plugins: [
    ["@babel/transform-runtime", {
      version: "^7.20.1",
    }],
    ["polyfill-corejs3", {
      method: "usage-pure",
      version: "^3.26.1",
    }],
  ],
  env: {
    test: {
      plugins: [
        ["node-cjs-interop", {
          packages: ["@reduxjs/toolkit"],
          loose: true,
        }],
      ],
    },
  },
};
export { config as default };
