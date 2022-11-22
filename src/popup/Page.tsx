import { useContext } from "react";
import { resolveURL } from "../protocols/resolver.js";
import { TabContext } from "./tab.js";

export function Page(): React.ReactElement | null {
  const tabData = useContext(TabContext);
  const res = tabData?.url ? resolveURL(tabData.url) : undefined;
  return (
    <>
      <h1>Popup</h1>
      {
        res?.type === "Account"
        ? <p>User: {res.username}@{res.domain}</p>
        : res?.type === "Status"
        ? <p>Toot from {res.username}@{res.domain}</p>
        : null
      }
    </>
  )
}
