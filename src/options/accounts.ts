import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type AccountsState = {
  readonly accounts: Readonly<Record<string, Account>>;
};
export type Account = {
  /** ID in the form of `foo@bar.baz` */
  readonly id: string;
};

const initialState: AccountsState = {
  accounts: {},
};

const slice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    add(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      state.accounts[id] = { id };
    },
  },
});

export const { add } = slice.actions;
export default slice.reducer;
