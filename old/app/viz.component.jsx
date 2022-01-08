import * as React from "react";
import { useAudioVisualizer } from "./hooks/visualizer.hook";
import { Link } from "react-location";
import motzart from "../audio/motzart.mp3";
import { makeRenderer } from "../../index";

import "../css/audioviz.css";

export const AudioVisualizer = () => {
  const [file, setFile] = React.useState(undefined);
  const [isAudioPlaying, setIsAudioPlaying] = React.useState(false);

  useAudioVisualizer();

  React.useEffect(() => {
    console.log(`AWW YEAH`);
    // look for canvasas in the DOM and if there are none, run the makeRenderer function
    const canvas = document.getElementsByTagName("canvas");
    if (canvas.length === 0) {
      makeRenderer();
    }
  }, []);

  let style = !isAudioPlaying ? "cta" : "";

  return (
    <div id="screen--start">
      <div className="audioVisualizer">
        <div id="content">
          <Link
            className="nav-link"
            to="/"
            getActiveProps={() => {
              return {
                style: {
                  fontWeight: "bold",
                },
              };
            }}
          >
            Home
          </Link>

          <div className={style}>
            {!isAudioPlaying && <h1>Get some tunes</h1>}
            <>
              <label
                className={
                  !isAudioPlaying
                    ? "custom-file-upload-2"
                    : "custom-file-upload"
                }
              >
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
            </>
          </div>

          <audio
            id="audio"
            controls
            onEnded={(data) => {
              window.stopAnimation();
              console.log("AUDIO END");
              setIsAudioPlaying(false);
            }}
            onPlay={(e) => {
              console.log("AUDIO PLAY");
              setIsAudioPlaying(true);
            }}
          ></audio>
        </div>
      </div>
    </div>
  );
};
