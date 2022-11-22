import { createRoot } from "react-dom/client";
import { ActiveTabProvider } from "../popup/tab.js";
import { Page } from "../popup/Page.js";

const root = createRoot(document.querySelector("#root")!);
root.render(
  <ActiveTabProvider>
    <Page />
  </ActiveTabProvider>
);
