import { ctx, canvas } from "../canvas.js";
import {
  requestAnimationFrame,
  cancelAnimationFrame,
  animation,
} from "./render-loop.js";
import { analyser, bufferLength, dataArray } from "./microphone.js";

export function renderFrame() {
  animation.id = requestAnimationFrame(renderFrame);

  analyser.getByteFrequencyData(dataArray);
  // console.log("renderFrame");
  // console.log(dataArray);
  // // clear the canvas
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // x is for the bar offset on X axis
  let x = 0;

  // placeholder for bar height
  let barHeight;

  // the width of each bar
  let barWidth = (canvas.width / bufferLength) * 2.5;

  // for each frequency bin in the array
  // loop through the dataArray and draw a bar
  // then increment the x position by the bar width
  for (var i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i];
    paintBar(i, barHeight, bufferLength, x);
    x += barWidth + 1;
  }
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
