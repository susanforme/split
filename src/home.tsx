import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { createUseStyles } from "react-jss";
import { getUrl } from "./utils";
import openImg from "./img/open.png";
const Home = () => {
  const [urls, setUrls] = useState([{ url: "", date: 1 }]);
  useEffect(() => {
    const data = getUrl();
    setUrls(data || []);
  }, []);
  const styles = useStyles();
  const iframes = urls.map((v) => {
    return (
      <div className={styles.iframeChild} key={v.date}>
        <div className={styles.operate}>
          <img src={openImg} alt="" />
        </div>
        <iframe src={v.url} frameBorder="0"></iframe>
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
    },
  })();
}
