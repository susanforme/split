import React from "react";
import ReactDOM from "react-dom";
import { createUseStyles } from "react-jss";

const Popup = () => {
  const styles = useStyles();
  return (
    <>
      <div id="app">
        <div className={styles.item} onClick={() => openSplitPage()}>
          <span>分屏</span>
        </div>
        <div className={styles.item}>
          <span>左右分屏</span>
        </div>
        <div className={styles.item}>
          <span>上下分屏</span>
        </div>
        <div className={styles.item}>
          <span>管理面板</span>
        </div>
        <div className={styles.item}>
          <span>帮助</span>
        </div>
      </div>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);

// 添加参数,识别参数是左右分屏还是上下
function openSplitPage() {
  const url = chrome.runtime.getURL("home.html");
  chrome.tabs.create({ url });
}

function useStyles() {
  return createUseStyles({
    item: {
      color: "red",
    },
  })();
}
