import * as React from "react";
import * as ReactDOM from "react-dom";
import { motion } from "framer-motion";

import { ReactLocation, Router, useMatch, Outlet, Link } from "react-location";
const reactLocation = new ReactLocation();
import { ReactLocationDevtools } from "react-location-devtools";

import { useAudioVisualizer } from "./hooks/visualizer.hook";
import { AudioControls } from "./audio.component";
import { Welcome } from "./welcome.component";

import "../css/start-screen.css";

const routes = [
  {
    path: "/",
    children: [
      {
        path: "welcome",
        element: <Welcome />,
      },
      {
        path: "audio-viz",
        element: <div>AWW YEAH!</div>,
      },
    ],
  },
];

const App = () => {
  const [playing, setPlaying] = React.useState(false);

  useAudioVisualizer(playing);

  return (
    <Router routes={routes} location={reactLocation}>
      <Link to="/welcome">welcome</Link>
      <Link to="/audio-viz">Audio Viz</Link>
      {/* <div id="screen--start">
        <div>{playing ? <AudioControls /> : null}</div>
      </div> */}
      <ReactLocationDevtools initialIsOpen={false} />
      <Outlet />
    </Router>
  );
};

// create and mount a react app
const root = document.getElementById("root");
ReactDOM.render(<App />, root);
