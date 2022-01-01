import * as React from "react";

export const AudioControls = () => {
  return (
    <div className="audioControls">
      <div id="content">
        <label className="custom-file-upload">
          Select MP3
          <input
            type="file"
            id="thefile"
            accept="audio/*"
            onChange={() => {
              //   setPlaying(true);
            }}
          />
        </label>
        <audio id="audio" controls></audio>
      </div>
    </div>
  );
};
