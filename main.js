import styles from "./style.css";

// create a new button called get started
const getStartedButton = document.createElement("button");
getStartedButton.innerText = "Get Started";
getStartedButton.className = "getStartedButton";
getStartedButton.addEventListener("click", handleGetStartedButtonClick);
// append the button to the DOM
document.body.appendChild(getStartedButton);

function handleGetStartedButtonClick() {
  import("./new/init.js").then(({ handleOnLoad }) => {
    handleOnLoad();

    // remove the button from the DOM
    document.body.removeChild(getStartedButton);
  });
}

// document.body.addEventListener("click", (e) => {
//   console.log("click!");
// });
