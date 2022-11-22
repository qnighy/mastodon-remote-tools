import React, { useEffect, useRef, useState } from "react";

export type TabData = {
  url: string | undefined;
};

export const TabContext = React.createContext<TabData | undefined>(undefined);
TabContext.displayName = "TabContext";

export type ActiveTabProviderProps = {
  children?: React.ReactNode | undefined;
};
export function ActiveTabProvider(props: ActiveTabProviderProps): React.ReactElement | null {
  const { children } = props;
  const currentWindowId = useRef<number | undefined>( undefined);
  const [tabData, setTabData] = useState<TabData | undefined>(undefined);
  useEffect(() => {
    let canceled = false;
    // On error we don't retry.
    chrome.tabs.query({ active: true, currentWindow: true })
      .then((tabs) => {
        if (tabs[0] && !canceled) {
          setTabData(tabDataFrom(tabs[0]));
          currentWindowId.current ??= tabs[0].windowId;
        }
      });
    return () => {
      canceled = true;
    }
  }, []);
  useEffect(() => {
    let canceled = false;
    function listener(activeInfo: chrome.tabs.TabActiveInfo) {
      if (
        currentWindowId.current != null &&
        activeInfo.windowId !== currentWindowId.current
      ) return;
      // On error we don't retry.
      chrome.tabs.get(activeInfo.tabId)
        .then((tab) => {
          if (!canceled && tab.active && tab.windowId === currentWindowId.current) {
            setTabData(tabDataFrom(tab));
          }
        })
    }
    chrome.tabs.onActivated.addListener(listener);
    return () => {
      canceled = true;
      chrome.tabs.onActivated.removeListener(listener);
    };
  }, []);
  useEffect(() => {
    function listener(tabId: number, tabChangeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) {
      if (tab.active && tab.windowId === currentWindowId.current) {
        setTabData(tabDataFrom(tab));
      }
    }
    chrome.tabs.onUpdated.addListener(listener);
    return () => {
      chrome.tabs.onUpdated.removeListener(listener);
    };
  }, []);
  return (
    <TabContext.Provider value={tabData}>
      {children}
    </TabContext.Provider>
  )
}

function tabDataFrom(tab: chrome.tabs.Tab): TabData {
  return {
    url: tab.url
  };
}
