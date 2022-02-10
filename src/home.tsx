import React from "react";
import ReactDOM from "react-dom";
import { createUseStyles } from "react-jss";
const Home = () => {

  /*
   * const iframes = document.querySelectorAll("iframe");
   * const urls = JSON.parse(localStorage.getItem("iframeUrl"));
   * for (let i = 0; i < iframes.length; i++) {
   *   const element = iframes[i];
   *   element.id = urls[i].date;
   *   element.src = urls[i].url;
   * }
   */
  const styles = useStyles();
  const iframes = [{ src: "", date: 1 }].map((v) => {
    return (
      <div className={styles.iframeChild}>
        <iframe src="" frameBorder="0"></iframe>
      </div>
    );
  });
  return (
    <>
      <div id="app_home">{iframes}</div>
    </>
  );
};
ReactDOM.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  document.getElementById("root")
);
function useStyles() {
  return createUseStyles({
    iframeChild: {
      color: "red",
    },
  })();
}
