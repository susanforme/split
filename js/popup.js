const split = document.getElementById("split");
split.onclick = openSplitPage;
function openSplitPage() {
  const url = chrome.runtime.getURL("home.html");
  chrome.tabs.create({ url });
}
