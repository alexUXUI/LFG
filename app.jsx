import * as React from "react";
import * as ReactDOM from "react-dom";
import { motion } from "framer-motion";

import "./start-screen.css";

const App = () => {
  const [playing, setPlaying] = React.useState(false);
  const firstMount = React.useRef(true);

  React.useEffect(() => {
    if (playing) {
      import("./index.js").then(({ runViz }) => {
        runViz(playing);
      });
    } else {
      if (!firstMount.current) {
        import("./index.js").then(({ runViz }) => {
          runViz(false);
        });
      }
    }
    firstMount.current = false;
  }, [playing]);

  const AudioControls = () => {
    return (
      <div>
        <div id="content">
          <label className="custom-file-upload">
            Select MP3
            <input
              type="file"
              id="thefile"
              accept="audio/*"
              onChange={() => {
                setPlaying(true);
              }}
            />
          </label>
          <audio id="audio" controls></audio>
        </div>
      </div>
    );
  };

  return (
    <div id="screen--start">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <button onClick={() => setPlaying(!playing)}>
          {playing ? "Stop" : "Start"}
        </button>
        {playing ? <AudioControls /> : null}
      </motion.div>
    </div>
  );
};

// create and mount a react app
const root = document.getElementById("root");
ReactDOM.render(<App />, root);
