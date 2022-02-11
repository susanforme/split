import { IFRAME_URL } from "./key";
// http://www.kkh86.com/it/chrome-extension-doc/extensions/storage.html#property-sync
export async function getUrl() {
  const data = await chrome.storage.sync.get(IFRAME_URL);
  return data;
}
//  处理设置
export async function setUrl(url?: string) {
  const defaultUrls = [
    {
      url: "https://vuejs.org/",
      date: Date.now(),
    },
    {
      url: "https://reactjs.org/",
      date: Date.now() + 1,
    },
  ];
  const urls = url ? [] : defaultUrls;
  await chrome.storage.sync.set({ [IFRAME_URL]: urls });
}
