// create a variable for a frame animation id
let animationId;

// create request and cancel animation frame functions
const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame;

const cancelAnimationFrame =
  window.cancelAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.mozCancelAnimationFrame;

function runAnimationLoop(analyser) {
  // get the frequency data

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

  // request another frame
  //   animationId = requestAnimationFrame(runAnimationLoop);
}

function createAudio() {
  // create audio element and append it to the body
  const audio = document.createElement("audio");
  document.body.appendChild(audio);

  // set the audio element attributes
  audio.setAttribute("controls", "controls");
  audio.setAttribute("preload", "auto");
  //   audio.setAttribute("src", "./audio/motzart.mp3");
  audio.setAttribute("type", "audio/mpeg");
  audio.setAttribute("id", "audio");
  audio.setAttribute("class", "audio");
  audio.style.zIndex = 100;
}

createAudio();

var context = new AudioContext();
const _audio = document.getElementById("audio");
var src = context.createMediaElementSource(_audio);
var analyser = context.createAnalyser();

src.connect(analyser);
analyser.connect(context.destination);

analyser.fftSize = 2048;

function handleAudioData(files) {
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
  handleOnLoad();
};

function handleOnLoad() {
  file.onchange = function () {
    var files = this.files;
    handleFileChange(files);
  };
}

function stop(e) {
  e.preventDefault();
  console.log("stop");
  cancelAnimationFrame(animationId);
}

function start(e) {
  e.preventDefault();
  console.log("start");

  runAnimationLoop(analyser);
}

function connectFileToAudio(files, audio) {
  audio.src = URL.createObjectURL(files[0]);
  audio.load();
}

function handleFileChange(files) {
  const audio = document.getElementById("audio");
  connectFileToAudio(files, audio);
}

// when the audio is paused, stop the animation
audio.addEventListener("pause", stop);

// when the audio is playing, start the animation
audio.addEventListener("play", start);

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
