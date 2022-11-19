import { createRoot } from "react-dom/client";
import { Page } from "../options/Page.js";

const root = createRoot(document.querySelector("#root")!);
root.render(<Page />);
