import styles from "./style.css";

document.body.addEventListener("click", (e) => {
  console.log("click!");
  import("./new/init.js").then(({ handleOnLoad }) => {
    handleOnLoad();
  });
});
