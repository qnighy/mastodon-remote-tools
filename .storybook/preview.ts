import { storage } from "./fake-storage.js";

globalThis.chrome ??= {} as any;
globalThis.chrome.storage ??= storage as any;
globalThis.chrome.runtime ??= {} as any;

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
