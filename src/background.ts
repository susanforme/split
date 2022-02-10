import { getUrl, setUrl } from "./utils";
import { CONTEXT_ID } from "./utils/key";

// [
//   { id: "main", visible: true, title: "main" },
//   { id: "sub1", visible: true, title: "sub1", parentId: "main" },
// ];
chrome.contextMenus.create({
  title: "分屏",
  id: CONTEXT_ID.SPLIT,
  visible: true,
});
chrome.contextMenus.onClicked.addListener((v) => {
  const { pageUrl, menuItemId } = v;
  getUrl()
    .then((res) => {
      console.log(res);
    })
    .catch(() => {
      setUrl();
    });
  // switch (menuItemId) {
  //   case CONTEXT_ID.SPLIT:
  //     const urls = JSON.parse(localStorage.getItem("iframeUrl"));
  //     let minUrlIndex = 0;
  //     // 找出最久的url
  //     for (let i = 1; i < urls.length; i++) {
  //       if (urls[i].date < urls[i - 1].date) {
  //         minUrlIndex = i;
  //       }
  //     }
  //     urls[minUrlIndex] = {
  //       url: pageUrl,
  //       date: Date.now(),
  //     };
  //     localStorage.setItem("iframeUrl", JSON.stringify(urls));
  //     const url = chrome.runtime.getURL("home.html");
  //     chrome.tabs.create({ url });
  //     break;
  //   default:
  //     break;
  // }
  console.log(v);
  console.log(pageUrl, menuItemId);
});
