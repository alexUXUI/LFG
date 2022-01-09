import { analyser } from "./audio.js";
import { runAnimationLoop } from "./animation.js";

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

  runAnimationLoop(analyser);
}
