import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resolveURL } from "../protocols/resolver.js";
import { generateURL } from "../protocols/urlgen.js";
import { load } from "../store/accounts.js";
import type { State } from "../store/store.js";
import { TabContext } from "./tab.js";

export function Page(): React.ReactElement | null {
  const tabData = useContext(TabContext);
  const saveState = useSelector((s: State) => s.accounts.saveState);
  const saveError = useSelector((s: State) => s.accounts.saveError);
  const accounts = useSelector((state: State) => state.accounts.accounts);
  const dispatch = useDispatch();
  useEffect(() => {
    if (saveState === "init" && !saveError) {
      dispatch(load());
    }
  }, [saveState]);
  const res = tabData?.url ? resolveURL(tabData.url) : undefined;
  if (!res) {
    return (
      <div style={{ minWidth: "300px" }}>
        <p>Nothing to do for this page.</p>
        <p>URL = {tabData?.url}</p>
      </div>
    );
  }
  if (saveError) {
    return <p>{saveError.name}: {saveError.message}</p>;
  } else if (saveState === "init" || saveState === "loading") {
    return <p>loading...</p>;
  }
  if (Object.keys(accounts).length === 0) {
    return (
      <div style={{ minWidth: "300px" }}>
        <p>You need to <a href="options.html" target="_blank" rel="noreferrer noopener">configure this app</a> first.</p>
      </div>
    );
  }
  return (
    <div style={{ minWidth: "300px" }}>
      <ul>
        {
          Object.values(accounts).map((account) => (
            <li key={account.id}>
              <a href={generateURL(account.id, res)} target="_blank" rel="noreferrer noopener">
                Open for {account.id}
              </a>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
