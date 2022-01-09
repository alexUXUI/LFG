import { renderFrame } from "./animation.js";
import { analyser, bufferLength } from "./audio.js";

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

export function runAnimationLoop(analyser) {
  var WIDTH = canvas.width;
  var HEIGHT = canvas.height;

  var barWidth = (WIDTH / bufferLength) * 2.5;
  var barHeight;
  var x = 0;

  renderFrame();
}

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
