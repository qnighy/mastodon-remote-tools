import { configureStore } from "@reduxjs/toolkit";
import accountsReducer from "./accounts.js";

export type State = ReturnType<ReturnType<typeof configureDefaultStore>["getState"]>;

export function configureDefaultStore() {
  return configureStore({
    reducer: {
      accounts: accountsReducer,
    },
  });
}
