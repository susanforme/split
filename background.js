const contextId = {
  SPLIT1: "sampleContextMenu",
};
chrome.contextMenus.create({
  title: "分屏",
  id: contextId.SPLIT1,
});
let color = "#3aa757";
chrome.contextMenus.onClicked.addListener((v) => {
  const { pageUrl, menuItemId } = v;
  switch (menuItemId) {
    case contextId.SPLIT1:
      break;
    default:
      break;
  }
  console.log(v);
  console.log(pageUrl, menuItemId);
});
