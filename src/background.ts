import { setUrl } from "./utils";
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
  switch (menuItemId) {
    case CONTEXT_ID.SPLIT:
      setUrl(pageUrl).then(() => {
        const url = chrome.runtime.getURL("home.html");
        chrome.tabs.create({ url });
      });
      break;
    default:
      break;
  }
  console.log("当前页面为" + pageUrl);
});
