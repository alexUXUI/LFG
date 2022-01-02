import * as React from "react";

export const useAudioVisualizer = (playing) => {
  const firstMount = React.useRef(true);

  React.useEffect(() => {
    console.log("searching for canvas element");
    const canvas = document.querySelector("canvas");

    if (canvas) {
      console.log("canvas found");
      console.log(canvas);
    } else {
      console.log("canvas not found");
    }

    import("../../index.js").then(({ runViz }) => {
      runViz(playing);
    });

    firstMount.current = false;
  }, [playing]);
};
