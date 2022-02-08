chrome.contextMenus.create({
  title: "测试右键菜单",
  onclick: function () {
    alert("您点击了右键菜单！");
  },
});
let color = "#3aa757";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log("Default background color set to %c green", `color: ${color}`);
});
