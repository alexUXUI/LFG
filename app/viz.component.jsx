import * as React from "react";
import { useAudioVisualizer } from "./hooks/visualizer.hook";

export const AudioVisualizer = () => {
  const [playing, setPlaying] = React.useState(false);

  useAudioVisualizer(playing);

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
