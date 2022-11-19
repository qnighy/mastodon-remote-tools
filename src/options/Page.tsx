import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "./accounts.js";
import type { State } from "./store.js";

export function Page(): React.ReactElement | null {
  return (
    <>
      <h1>Options</h1>
      <h2>Accounts</h2>
      <EditAccountsForm />
      <NewAccountForm />
    </>
  );
}

function EditAccountsForm(): React.ReactElement | null {
  const accounts = useSelector((s: State) => s.accounts.accounts);
  return (
    <ul>{
      Object.values(accounts).map((account) => (
        <li>{account.id}</li>
      ))
    }</ul>
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
