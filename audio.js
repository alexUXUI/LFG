// // create an audio element and append it to the body
// // const audio = document.createElement("audio");
// var audio = document.querySelector("audio");
// // document.body.appendChild(audio);

// // set the audio element attributes
// audio.setAttribute("controls", "controls");
// // audio.setAttribute("autoplay", "autoplay");
// audio.setAttribute("preload", "auto");
// audio.setAttribute("src", "./audio/motzart.mp3");
// audio.setAttribute("type", "audio/mpeg");
// audio.setAttribute("id", "audio");
// audio.setAttribute("class", "audio");

// // create audio context and connect it to the audio element
// const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
// const source = audioCtx.createMediaElementSource(audio);
// source.connect(audioCtx.destination);

// // get the frequency data from the audio element
// const analyser = audioCtx.createAnalyser();
// analyser.fftSize = 2048;
// const bufferLength = analyser.frequencyBinCount;
// const dataArray = new Uint8Array(bufferLength);

// console.log("audioCtx", audioCtx);

// // create a variable for a frame animation id
// let animationId;

// // create request and cancel animation frame functions
// const requestAnimationFrame =
//   window.requestAnimationFrame ||
//   window.webkitRequestAnimationFrame ||
//   window.mozRequestAnimationFrame;

// const cancelAnimationFrame =
//   window.cancelAnimationFrame ||
//   window.webkitCancelAnimationFrame ||
//   window.mozCancelAnimationFrame;

// // create a canvas element and append it to the body
// const canvas = document.createElement("canvas");
// document.body.appendChild(canvas);

// // create a 2d canvas context named ctx
// const ctx = canvas.getContext("2d");

// const runAnimationLoop = () => {
//   // get the frequency data
//   analyser.getByteFrequencyData(dataArray);
//   console.log(dataArray);

//   // request another frame
//   animationId = requestAnimationFrame(runAnimationLoop);
// };

// const stop = (e) => {
//   e.preventDefault();
//   console.log("stop");
//   cancelAnimationFrame(animationId);
// };

// const start = (e) => {
//   e.preventDefault();
//   console.log("start");
//   runAnimationLoop();
// };

// // when the audio is paused, stop the animation
// audio.addEventListener("pause", stop);

// // when the audio is playing, start the animation
// audio.addEventListener("play", start);

function createAudio() {
  // create audio element and append it to the body
  const audio = document.createElement("audio");
  document.body.appendChild(audio);

  // set the audio element attributes
  audio.setAttribute("controls", "controls");
  audio.setAttribute("preload", "auto");
  audio.setAttribute("src", "./audio/motzart.mp3");
  audio.setAttribute("type", "audio/mpeg");
  audio.setAttribute("id", "audio");
  audio.setAttribute("class", "audio");
  audio.style.zIndex = 100;
}

createAudio();

function handleAudio(files) {
  audio.src = URL.createObjectURL(files[0]);
  audio.load();
  audio.play();
  var context = new AudioContext();
  var src = context.createMediaElementSource(audio);
  var analyser = context.createAnalyser();

  return { analyser, src, context };
}

function createCanvas() {
  var canvas = document.createElement("canvas");
  canvas.setAttribute("id", "canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.zIndex = 0;
  document.body.appendChild(canvas);

  return canvas;
}

const canvas = createCanvas();

function getAudioAndFile() {
  const file = document.getElementById("thefile");
  const audio = document.getElementById("audio");

  return { file, audio };
}

const { file, audio } = getAudioAndFile();

function createCanvasContext() {
  const _canvas = document.getElementById("canvas");
  const ctx = _canvas.getContext("2d");
  return ctx;
}

var ctx = createCanvasContext();

window.onload = function () {
  file.onchange = function () {
    var files = this.files;
    const { analyser, src, context } = handleAudio(files);

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;

    var bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);

    var dataArray = new Uint8Array(bufferLength);

    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;

    var barWidth = (WIDTH / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    function renderFrame() {
      requestAnimationFrame(renderFrame);

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

    audio.play();
    renderFrame();
  };
};

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
