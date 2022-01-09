import { start, stop } from "./render-loop.js";

navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia;

const micCtx = new AudioContext();
const analyser = micCtx.createAnalyser();
analyser.fftSize = 2048;

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

let micStream = undefined;

function handleStream(stream) {
  micStream = micCtx.createMediaStreamSource(stream);

  micStream.connect(analyser);

  // uncomment to hear mic output from speakers
  // analyser.connect(micCtx.destination);

  // uncomment to pause mic
  // micStream.mediaStream.getAudioTracks()[0].enabled = false;

  start();
}

export function startMic() {
  // disable mic start button
  const startBtn = document.getElementById("micStart");
  startBtn.disabled = true;

  // enable stop mic btn
  const stopBtn = document.getElementById("micStop");
  stopBtn.disabled = false;

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

export function initMic() {
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
}

export { analyser, bufferLength, dataArray };
