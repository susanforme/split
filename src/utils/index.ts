import { IFRAME_URL } from "./key";
// http://www.kkh86.com/it/chrome-extension-doc/extensions/storage.html#property-sync
export async function getUrl() {
  const res = await chrome.storage.local.get(IFRAME_URL);
  return res;
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
  await chrome.storage.local.set({ IFRAME_URL: urls });
  console.log("url设置成功");
}
