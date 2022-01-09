import { analyser } from "./audio.js";
import { ctx, canvas } from "./canvas.js";

// create a variable for a frame animation id
let animationId;

export const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame;

export const cancelAnimationFrame =
  window.cancelAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.mozCancelAnimationFrame;

export function runAnimationLoop(analyser) {
  // is half of the analyser fftsize
  var bufferLength = analyser.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength);

  var WIDTH = canvas.width;
  var HEIGHT = canvas.height;

  var barWidth = (WIDTH / bufferLength) * 2.5;
  var barHeight;
  var x = 0;

  function renderFrame() {
    animationId = requestAnimationFrame(renderFrame);

    x = 0;

    analyser.getByteFrequencyData(dataArray);

    console.log(dataArray);

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    for (var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];
      paintBar(i, barHeight, bufferLength, x);
      x += barWidth + 1;
    }
  }

  renderFrame();
}

function paintBar(i, barHeight, bufferLength, x) {
  var WIDTH = canvas.width;
  var HEIGHT = canvas.height;
  var barWidth = (WIDTH / bufferLength) * 2.5;
  var r = barHeight + 25 * (i / bufferLength);
  var g = 250 * (i / bufferLength);
  var b = 50;

  ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
  ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
}

// stop the animation loop
export function stop(e) {
  e.preventDefault();
  console.log("stop");
  cancelAnimationFrame(animationId);
}

// start the animation loop
export function start(e) {
  e.preventDefault();
  console.log("start");

  runAnimationLoop(analyser);
}
