import { ctx, canvas } from "./canvas.js";
import {
  requestAnimationFrame,
  cancelAnimationFrame,
  animation,
} from "./render-loop.js";
import { analyser, bufferLength, dataArray } from "./audio.js";

export function renderFrame() {
  animation.id = requestAnimationFrame(renderFrame);

  analyser.getByteFrequencyData(dataArray);

  console.log(dataArray);

  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let x = 0;
  let barHeight;
  var barWidth = (canvas.width / bufferLength) * 2.5;

  for (var i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i];
    paintBar(i, barHeight, bufferLength, x);
    x += barWidth + 1;
  }
}

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
