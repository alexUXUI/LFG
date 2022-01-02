import * as React from "react";

export const useAudioVisualizer = (playing, setShouldEnd, file) => {
  React.useEffect(() => {
    import("../../index.js").then(({ runViz }) => {
      console.log(file);
      runViz(playing, setShouldEnd, file);
    });
  }, [playing, setShouldEnd, file]);
};
