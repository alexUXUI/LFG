import { start, stop } from "./render-loop.js";

// interface that allos us to ask the browser to use the mic
navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia;

// mic audio context
const micCtx = new AudioContext();

// mic audio analyser
const analyser = micCtx.createAnalyser();
analyser.fftSize = 2048;

// analyser data
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

// the mic audio stream
let micStream = undefined;

// gets called when the browser agrees to let the user have the mic
function handleStream(stream) {
  // connects the mic stream to the audio context
  micStream = micCtx.createMediaStreamSource(stream);

  // connects the mic stream to the analyser
  micStream.connect(analyser);

  // start the animation loop
  start("./mic-audio/microphone.js");
}

export function startMic() {
  // disable mic start button
  const startBtn = document.getElementById("micStart");
  startBtn.disabled = true;

  // enable stop mic btn
  const stopBtn = document.getElementById("micStop");
  stopBtn.disabled = false;

  // get the audio stream from the browser mic
  return navigator.getUserMedia(
    { video: false, audio: true },
    handleStream,
    console.log
  );
}

export function handleMicStop() {
  if (micStream) {
    micStream.disconnect();
    micStream = undefined;
    stop();

    // enable mic start button
    const startBtn = document.getElementById("micStart");
    startBtn.disabled = false;

    // disable stop mic btn
    const stopBtn = document.getElementById("micStop");
    stopBtn.disabled = true;
  }
}

// create a button to start the mic and append it to a div with id of "mic"
const micButton = document.createElement("button");
micButton.setAttribute("id", "micStart");
micButton.innerText = "Start Mic";
micButton.addEventListener("click", startMic);

// append button to div of id "mic"
const mic = document.getElementById("mic");
mic.appendChild(micButton);

// create a button to stop the mic and append it to the DOM
const stopMicButton = document.createElement("button");
stopMicButton.setAttribute("id", "micStop");
stopMicButton.innerText = "Stop Mic";
stopMicButton.addEventListener("click", handleMicStop);
stopMicButton.disabled = true;
mic.appendChild(stopMicButton);

export { analyser, bufferLength, dataArray };
