import { createRoot } from "react-dom/client";
import { ActiveTabProvider } from "../popup/tab.js";
import { App } from "../popup/App.js";

const root = createRoot(document.querySelector("#root")!);
root.render(
  <ActiveTabProvider>
    <App />
  </ActiveTabProvider>
);
