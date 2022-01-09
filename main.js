console.log("loaded!");

document.body.addEventListener("click", (e) => {
  console.log("click!");
  import("./new/init.js").then(({ handleOnLoad }) => {
    handleOnLoad();
  });
});
