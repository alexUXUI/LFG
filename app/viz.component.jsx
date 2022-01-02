import * as React from "react";
import { useAudioVisualizer } from "./hooks/visualizer.hook";
import { Link } from "react-location";

import "../css/audioviz.css";

export const AudioVisualizer = () => {
  const [file, setFile] = React.useState(undefined);

  useAudioVisualizer();

  return (
    <div id="screen--start">
      <div className="audioVisualizer">
        <div id="content">
          <>
            <Link className="nav-link" to="/">
              Home
            </Link>
            <label className="custom-file-upload">
              Select MP3
              <input
                type="file"
                id="thefile"
                accept="audio/*"
                onChange={(e) => {
                  setFile(URL.createObjectURL(e.target.files[0]));
                }}
              />
            </label>
            <audio
              id="audio"
              controls
              onEnded={(data) => {
                console.log("AUDIO DONE");
              }}
              onPlay={(e) => {
                console.log("AUDIO PLAY");
              }}
            ></audio>
          </>
        </div>
      </div>
    </div>
  );
};
