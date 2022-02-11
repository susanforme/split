import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { createUseStyles } from "react-jss";
import { getUrl } from "./utils";
const Home = () => {
  // /*
  //  * const iframes = document.querySelectorAll("iframe");
  //  * const urls = JSON.parse(localStorage.getItem("iframeUrl"));
  //  * for (let i = 0; i < iframes.length; i++) {
  //  *   const element = iframes[i];
  //  *   element.id = urls[i].date;
  //  *   element.src = urls[i].url;
  //  * }
  //  */
  const [urls, setUrls] = useState([{ src: "", date: 1 }]);
  useEffect(() => {
    getUrl().then();
  });
  const styles = useStyles();
  const iframes = urls.map((v) => {
    return (
      <div className={styles.iframeChild} key={v.date}>
        <iframe src={v.src} frameBorder="0"></iframe>
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
    },
  })();
}
