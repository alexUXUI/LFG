import { renderFrame } from "./animation.js";

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
export function stop() {
  console.log("stop");
  cancelAnimationFrame(animation.id);
}

// start the animation loop
export function start() {
  console.log("start");
  renderFrame();
}
