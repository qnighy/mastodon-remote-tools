// @ts-check

/** @type {import("jest").Config} */
const config = {
  clearMocks: true,
  collectCoverageFrom: [
    "src/**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
    "!**/node_modules/**",
  ],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "\\.stories\\.",
    "\\.babelrc\\.",
  ],
  extensionsToTreatAsEsm: [".ts", ".tsx", ".mts"],
  resolver: "ts-jest-resolver",
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.[jt]s?(x)",
    "<rootDir>/src/**/?(*.)+(spec|test).[tj]s?(x)"
  ],
};
export { config as default };
