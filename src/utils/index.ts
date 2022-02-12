import { IFRAME_URL } from "./key";
export function getUrlFromStorage() {
  let data = Storage.get<IframeUrl[]>(IFRAME_URL);
  // 不存在数据使用默认值
  if (!data) {
    initUrl();
    data = Storage.get<IframeUrl[]>(IFRAME_URL);
  }
  return data;
}
export function initUrl() {
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
  Storage.set(IFRAME_URL, defaultUrls);
}
//  设置url
export function setUrlFromStorage(url: string, index?: number) {
  const urls = getUrlFromStorage();
  const isInvalidUrl = url.startsWith("chrome-extension:");
  let minUrlIndex = 0;
  if (!urls) {
    return false;
  }
  // 不合法url
  if (isInvalidUrl) {
    return false;
  }
  if (Object.is(index, undefined)) {
    // 找出最久的url
    for (let i = 1; i < urls.length; i++) {
      if (urls[i].date < urls[i - 1].date) {
        minUrlIndex = i;
      }
    }
  } else {
    minUrlIndex = index as number;
  }
  urls[minUrlIndex] = {
    url,
    date: Date.now(),
  };
  Storage.set(IFRAME_URL, urls);
  return true;
}

// 解析url最终返回带http/https地址
export function urlParse() {}

// 封装localstorage
export class Storage {
  static get<T>(key: string) {
    let data: T;
    try {
      data = JSON.parse(window.localStorage.getItem(key) || "");
    } catch (error) {
      console.log(error);
      return;
    }
    return data;
  }
  // true 成功设置
  static set(key: string, value: any) {
    let newValue = "";
    if (typeof value !== "string") {
      try {
        newValue = JSON.stringify(value);
      } catch (error) {
        console.log(error);
        return false;
      }
    }
    window.localStorage.setItem(key, newValue);
    return true;
  }
}
export interface StorageType {
  IframeUrl?: IframeUrl[];
}

export interface IframeUrl {
  url: string;
  date: number;
  [key: string]: any;
}
