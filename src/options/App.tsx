import { Provider as ReduxProvider } from "react-redux";
import { configureDefaultStore } from "./store.js";
import { Page } from "./Page.js";

export function App(): React.ReactElement | null {
  const store = configureDefaultStore();
  return (
    <ReduxProvider store={store}>
      <Page />
    </ReduxProvider>
  );
}
