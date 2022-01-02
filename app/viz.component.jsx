import * as React from "react";
import { useAudioVisualizer } from "./hooks/visualizer.hook";
import { Link } from "react-location";

import "../css/audioviz.css";

export const AudioVisualizer = () => {
  const [file, setFile] = React.useState(undefined);

  const [isAudioPlaying, setIsAudioPlaying] = React.useState(false);

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
                window.stopAnimation();
                setIsAudioPlaying(false);
              }}
              onPlay={(e) => {
                console.log("AUDIO PLAY");
                setIsAudioPlaying(true);
              }}
            ></audio>
          </>

          {!isAudioPlaying && <h1>Get some tunes</h1>}
        </div>
      </div>
    </div>
  );
};
