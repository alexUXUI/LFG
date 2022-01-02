import * as React from "react";
import { useAudioVisualizer } from "./hooks/visualizer.hook";

import "../css/audioviz.css";

export const AudioVisualizer = () => {
  const [playing, setPlaying] = React.useState(true);

  useAudioVisualizer(playing);

  React.useEffect(() => {
    setPlaying(true);
  }, []);

  React.useEffect(() => {
    return () => {
      setPlaying(false);
    };
  }, []);

  return (
    <div id="screen--start">
      <div className="audioVisualizer">
        <div id="content">
          {playing ? (
            <>
              <label className="custom-file-upload">
                Select MP3
                <input type="file" id="thefile" accept="audio/*" />
              </label>
              <audio id="audio" controls></audio>
            </>
          ) : (
            <button onClick={() => setPlaying(true)}>Play</button>
          )}
        </div>
      </div>
    </div>
  );
};
