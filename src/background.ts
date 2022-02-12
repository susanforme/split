import { setUrlFromStorage } from "./utils";
import { CONTEXT_ID } from "./utils/key";

// [
//   { id: "main", visible: true, title: "main" },
//   { id: "sub1", visible: true, title: "sub1", parentId: "main" },
// ];
chrome.contextMenus.create({
  title: "分屏",
  id: CONTEXT_ID.SPLIT,
  documentUrlPatterns: ["*://*/*"],
  visible: true,
});
chrome.contextMenus.onClicked.addListener((v) => {
  const { pageUrl, menuItemId } = v;
  switch (menuItemId) {
    case CONTEXT_ID.SPLIT:
      {
        const url = chrome.runtime.getURL("home.html");

        if (setUrlFromStorage(pageUrl)) {
          chrome.tabs.create({ url });
        }
      }
      break;
    default:
      break;
  }
  console.log("当前页面为" + pageUrl);
});

// https://stackoverflow.com/questions/15532791/getting-around-x-frame-options-deny-in-a-chrome-extension
chrome.webRequest.onHeadersReceived.addListener(
  function (info) {
    // 所有response头
    const { responseHeaders } = info;
    console.log(info);

    if (!responseHeaders) {
      return;
    }
    for (let i = responseHeaders.length - 1; i >= 0; --i) {
      const header = responseHeaders[i].name.toLowerCase();
      if (
        header === "x-frame-options" ||
        header === "frame-options" ||
        // 删除csp
        header === "content-security-policy"
      ) {
        // Remove header
        responseHeaders.splice(i, 1);
      }
      //  自动设置CORS 跨域,建议设置为可配置
      if (header === "access-control-allow-origin") {
        responseHeaders.splice(i, 1, {
          name: responseHeaders[i].name,
          value: "*",
        });
      }
    }
    return { responseHeaders };
  },
  {
    // Pattern to match all http(s) pages
    urls: ["*://*/*"],
    // 执行范围 "xmlhttprequest"
    types: ["main_frame", "sub_frame"],
  },
  ["blocking", "responseHeaders"],
);

chrome.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    const { requestHeaders } = details;
    if (!requestHeaders) {
      return;
    }
    console.log("onBeforeSendHeader", details);
    // for (let i = 0; i <requestHeaders.length; ++i)
    // {
    //  if (requestHeaders[i].name.toLowerCase() === 'user-agent')
    //  {
    //   message.useragent = requestHeaders[i].value;
    //  }
    //  else if (requestHeaders[i].name.toLowerCase() === 'referer')
    //  {
    //   message.referrer = requestHeaders[i].value;
    //  }
    //  else if (requestHeaders[i].name.toLowerCase() === 'cookie')
    //  {
    //   message.cookies = requestHeaders[i].value;
    //   console.log(requestHeaders[i].value);
    //  }
    // }
    return {
      requestHeaders,
    };
  },
  {
    urls: ["<all_urls>"],
    types: ["main_frame", "sub_frame", "xmlhttprequest"],
  },
  ["blocking", "requestHeaders"],
);
