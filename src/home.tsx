import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { createUseStyles } from "react-jss";
import { getUrlFromStorage, IframeUrl, setUrlFromStorage } from "./utils";
import openImg from "./img/open.png";
const Home = () => {
  const [urls, setUrls] = useState<IframeUrl[]>([{ url: "", date: 1, isPullDown: false }]);
  useEffect(() => {
    getUrl();
  }, []);
  const styles = useStyles();
  const setPullDown = (isPullDown: boolean, index: number) => {
    setUrls((oldUrls) => {
      const newUrls = JSON.parse(JSON.stringify(oldUrls));
      newUrls[index].isPullDown = isPullDown;
      return newUrls;
    });
  };
  function getUrl() {
    const data = getUrlFromStorage();
    const newData = (data || []).map((v) => {
      v["isPullDown"] = false;
      return v;
    });
    setUrls(newData);
  }
  const iframes = urls.map((v, i) => {
    return (
      <div className={styles.iframeChild} key={v.date}>
        <div className={styles.operate}>
          {v.isPullDown ? (
            <input
              type="text"
              onBlur={() => setPullDown(false, i)}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  // 设置iframe
                  setUrlFromStorage(e.currentTarget.value, i);
                  getUrl();
                }
              }}
            />
          ) : (
            <img src={openImg} alt="" onClick={() => setPullDown(true, i)} />
          )}
        </div>
        <iframe src={v.url} frameBorder="0" allowFullScreen></iframe>
      </div>
    );
  });
  return (
    <>
      <div className={styles.home}>{iframes}</div>
    </>
  );
};
ReactDOM.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  document.getElementById("root"),
);
function useStyles() {
  return createUseStyles({
    home: {
      width: "100%",
      height: "100%",
      display: "flex",
    },
    iframeChild: {
      width: "50%",
      position: "relative",
      "& iframe": {
        width: "100%",
        height: "100%",
      },
    },
    operate: {
      position: "absolute",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      "& img": {
        width: "25px",
        height: "25px",
        cursor: "pointer",
        userSelect: "none",
      },
    },
  })();
}
