import * as React from "react";

export const useAudioVisualizer = (playing) => {
  const firstMount = React.useRef(true);

  React.useEffect(() => {
    import("../../index.js").then(({ runViz }) => {
      if (playing) {
        runViz(playing);
      } else if (!firstMount.current) {
        runViz(false);
      }
    });

    firstMount.current = false;
  }, [playing]);
};
