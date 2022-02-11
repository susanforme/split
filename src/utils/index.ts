import { IFRAME_URL, IS_CHROME_STORAGE } from "./key";
// http://www.kkh86.com/it/chrome-extension-doc/extensions/storage.html#property-sync
export async function getUrl() {
  // 传入null,获取所有数据
  const { iframeUrl }: IframeUrlType = await chrome.storage.sync.get(IFRAME_URL);
  return iframeUrl;
}
async function initUrl() {
  // 默认url
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
  await chrome.storage.sync.set({ [IFRAME_URL]: defaultUrls });
}
//  处理设置
export async function setUrl(url: string) {
  const urls = await getUrl();
  let minUrlIndex = 0;
  if (!urls) {
    await initUrl();
  }
  if (!urls) {
    console.log("初始化失败");
    return;
  }
  // 找出最久的url
  for (let i = 1; i < urls.length; i++) {
    if (urls[i].date < urls[i - 1].date) {
      minUrlIndex = i;
    }
  }
  urls[minUrlIndex] = {
    url,
    date: Date.now(),
  };
  return chrome.storage.sync.set({ [IFRAME_URL]: urls });
}

// 解析url最终返回带http/https地址
export function urlParse() {}

// false则为存储到localstorage,true为chrome.storage.sync
export async function isChromeStorage() {
  const { isLocalstorage }: { isLocalstorage?: boolean } = await chrome.storage.sync.get(
    IS_CHROME_STORAGE,
  );
  return !!isLocalstorage;
}
// 设置储存方式 option选项设置
export async function setStorage(isChromeStorage: boolean) {
  await chrome.storage.sync.set({ [IS_CHROME_STORAGE]: isChromeStorage });
}

interface IframeUrlType {
  iframeUrl?: {
    url: string;
    date: number;
  }[];
}
