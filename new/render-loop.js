import { renderFrame } from "./file-audio/animation.js";
import { analyser, bufferLength } from "./file-audio/audio.js";

export const animation = {
  id: undefined,
};

export const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame;

export const cancelAnimationFrame =
  window.cancelAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.mozCancelAnimationFrame;

// stop the animation loop
export function stop(e) {
  e.preventDefault();
  console.log("stop");
  cancelAnimationFrame(animation.id);
}

// start the animation loop
export function start(e) {
  e.preventDefault();
  console.log("start");

  renderFrame(analyser);
}
