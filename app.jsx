import * as React from "react";
import * as ReactDOM from "react-dom";
import { runViz } from "./index";
console.log(runViz);
const App = () => {
  const [playing, setPlaying] = React.useState(true);

  React.useEffect(() => {
    if (playing) {
      console.log("playing");
      runViz();
    }
  }, [playing]);

  return (
    <div>
      <h1>Hello World</h1>
      <p>This is my first react app</p>
      <button onClick={() => setPlaying(!playing)}>
        {playing ? "Stop" : "Start"}
      </button>
      <div id="content">
        <label className="custom-file-upload">
          Select MP3
          <input type="file" id="thefile" accept="audio/*" />
        </label>
        <audio id="audio" controls></audio>
      </div>
    </div>
  );
};

// create and mount a react app

const root = document.getElementById("root");
ReactDOM.render(<App />, root);
