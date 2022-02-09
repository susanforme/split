const iframes = document.querySelectorAll("iframe");
const urls = JSON.parse(localStorage.getItem("iframeUrl"));
for (let i = 0; i < iframes.length; i++) {
  const element = iframes[i];
  element.id = urls[i].date;
  element.src = urls[i].url;
}
