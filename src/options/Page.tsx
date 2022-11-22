import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, load, save } from "./accounts.js";
import type { State } from "./store.js";

export function Page(): React.ReactElement | null {
  return (
    <>
      <h1>Options</h1>
      <AccountsSection />
    </>
  );
}

function AccountsSection(): React.ReactElement | null {
  const saveState = useSelector((s: State) => s.accounts.saveState);
  const saveError = useSelector((s: State) => s.accounts.saveError);
  const accounts = useSelector((s: State) => s.accounts.accounts);
  const dispatch = useDispatch();
  useEffect(() => {
    if (saveState === "init" && !saveError) {
      dispatch(load());
    } else if (saveState === "edited" && !saveError) {
      dispatch(save({ accounts }));
    }
  }, [saveState]);
  return (
    <>
      <h2>Accounts</h2>
      {
        saveState === "init" || saveState === "loading"
        ? null
        :
          <>
            <EditAccountsForm />
            <NewAccountForm />
          </>
      }
      {
        saveError
        ? <p>{saveError.name}: {saveError.message}</p>
        : saveState === "init" || saveState === "loading"
        ? <p>Loading...</p>
        : saveState === "edited"
        ? <p>There are unsaved changes</p>
        : saveState === "saving"
        ? <p>Saving...</p>
        : null
      }
    </>
  );
}

function EditAccountsForm(): React.ReactElement | null {
  const accounts = useSelector((s: State) => s.accounts.accounts);
  return (
    <>
    <ul>{
      Object.values(accounts).map((account) => (
        <li key={account.id}>{account.id}</li>
      ))
    }</ul>
    </>
  );
}

function NewAccountForm(): React.ReactElement | null {
  const dispatch = useDispatch();
  const [newId, setNewId] = useState<string>("");
  const isValid = newId.includes("@");
  const addNewId = () => {
    if (!isValid) return;
    dispatch(add({ id: newId }));
  };
  return (
    <div>
      <input
        type="text"
        value={newId}
        onChange={(e) => setNewId(e.currentTarget.value)}
        onInput={(e) => setNewId(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addNewId();
          }
        }}
      />
      <button
        disabled={!isValid}
        onClick={addNewId}
      >
        Add
      </button>
    </div>
  );
}
