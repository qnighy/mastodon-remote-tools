import { createAsyncThunk, createSlice, type SerializedError } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const load = createAsyncThunk(
  "accounts/load",
  async () =>
    await new Promise<Readonly<Record<string, Account>> | undefined>((resolve, reject) => {
      chrome.storage.sync.get("accounts_v1", (items) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(items["accounts_v1"]);
        }
      });
    })
);

export const save = createAsyncThunk(
  "accounts/save",
  async (args: {
    accounts: Readonly<Record<string, Account>>,
  }) => {
    const { accounts } = args;
    await new Promise<void>((resolve, reject) => {
      chrome.storage.sync.set({
        accounts_v1: accounts,
      }, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  }
);

export type AccountsState = {
  readonly saveState: SaveState;
  readonly saveError?: SerializedError | undefined;
  readonly accounts: Readonly<Record<string, Account>>;
};
export type SaveState = "init" | "loading" | "edited" | "saving" | "saved";
export type Account = {
  /** ID in the form of `foo@bar.baz` */
  readonly id: string;
};

const initialState: AccountsState = {
  saveState: "init",
  accounts: {},
};

const slice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    add(state, action: PayloadAction<{ id: string }>) {
      if (state.saveState === "init" || state.saveState === "loading") return;
      const { id } = action.payload;
      state.accounts[id] = { id };
      state.saveState = "edited";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(load.pending, (state) => {
        state.saveState = "loading";
      })
      .addCase(load.fulfilled, (state, { payload }) => {
        state.saveState = "saved";
        state.accounts = payload ?? state.accounts;
      })
      .addCase(load.rejected, (state, { error }) => {
        state.saveState = "init";
        state.saveError = error;
      })
      .addCase(save.pending, (state) => {
        state.saveState = "saving";
      })
      .addCase(save.fulfilled, (state) => {
        state.saveState = "saved";
      })
      .addCase(save.rejected, (state, { error }) => {
        state.saveState = "edited";
        state.saveError = error;
      });
  },
});

export const { add } = slice.actions;
export default slice.reducer;
