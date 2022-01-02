import * as React from "react";

export const useAudioVisualizer = (playing) => {
  React.useEffect(() => {
    import("../../index.js").then(({ runViz }) => {
      runViz(playing);
    });
  }, [playing]);
};
