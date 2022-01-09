import { ctx, canvas } from "../canvas.js";
import {
  requestAnimationFrame,
  cancelAnimationFrame,
  animation,
} from "./render-loop.js";
export { analyserNode, bufferLength, freqDomain } from "./microphone.js";

// const bufferLength = analyserNode.frequencyBinCount;
// const freqDomain = new Uint8Array(bufferLength);

export function renderFrame(scriptNode) {
  animation.id = requestAnimationFrame(renderFrame);

  console.log("renderFrame");
  console.log(scriptNode);
  // // clear the canvas
  // ctx.fillStyle = "#000";
  // ctx.fillRect(0, 0, canvas.width, canvas.height);

  // // x is for the bar offset on X axis
  // let x = 0;

  // // placeholder for bar height
  // let barHeight;

  // // the width of each bar
  // let barWidth = (canvas.width / bufferLength) * 2.5;

  // // for each frequency bin in the array
  // // loop through the freqDomain and draw a bar
  // // then increment the x position by the bar width
  // for (var i = 0; i < bufferLength; i++) {
  //   barHeight = freqDomain[i];
  //   paintBar(i, barHeight, bufferLength, x);
  //   x += barWidth + 1;
  // }
}

// paint the bar depending on the freuqency amplitude for the height
export function paintBar(i, barHeight, bufferLength, x) {
  var WIDTH = canvas.width;
  var HEIGHT = canvas.height;
  var barWidth = (WIDTH / bufferLength) * 2.5;
  var r = barHeight + 25 * (i / bufferLength);
  var g = 250 * (i / bufferLength);
  var b = 50;

  ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
  ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
}
