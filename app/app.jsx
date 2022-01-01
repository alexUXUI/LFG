import * as React from "react";
import * as ReactDOM from "react-dom";
import { motion } from "framer-motion";

import "../css/start-screen.css";
import { useAudioVisualizer } from "./hooks/visualizer.hook";
import { AudioControls } from "./audio.component";

const App = () => {
  const [playing, setPlaying] = React.useState(false);

  useAudioVisualizer(playing);

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
        {!playing && (
          <>
            <h1>Welcome to the Audio Visualizer! 🔥</h1>
            <h2>Where your audio data generates 3D graphics</h2>
            <h3>About</h3>
            <p>To get started CLick Play</p>
            <button onClick={() => setPlaying(!playing)}>
              {playing ? "Stop" : "Start"}
            </button>
          </>
        )}
        {playing ? <AudioControls /> : null}
      </motion.div>
    </div>
  );
};

// create and mount a react app
const root = document.getElementById("root");
ReactDOM.render(<App />, root);
