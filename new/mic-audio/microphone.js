import { start, stop } from "./render-loop.js";

const audioContext = new AudioContext();

const BUFF_SIZE_RENDERER = 16384;

let micStream = null;

let gainNode = audioContext.createGain();
gainNode.connect(audioContext.destination);

const analyserNode = audioContext.createAnalyser();
analyserNode.smoothingTimeConstant = 0;
analyserNode.fftSize = 2048;

const bufferLength = analyserNode.frequencyBinCount;
const freqDomain = new Uint8Array(bufferLength);
const timeDomain = new Uint8Array(bufferLength);

const scriptNode = audioContext.createScriptProcessor(2048, 1, 1);

scriptNode.connect(gainNode);

if (!navigator.getUserMedia)
  navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;

function handleStream(stream) {
  micStream = audioContext.createMediaStreamSource(stream);
  micStream.connect(gainNode);

  // pause the stream
  micStream.mediaStream.getAudioTracks()[0].enabled = false;

  micStream.connect(analyserNode);

  analyserNode.connect(scriptNode);

  scriptNode.onaudioprocess = function (e) {
    analyserNode.getByteTimeDomainData(timeDomain);
    analyserNode.getByteFrequencyData(freqDomain);
    // console.log(freqDomain);
  };
}

function handleError(error) {
  console.error("Error capturing audio.");
}

export function initMic(stream) {
  if (navigator.getUserMedia) {
    navigator.getUserMedia({ audio: true }, handleStream, handleError);
  } else {
    console.error("getUserMedia not supported in this browser.");
  }
}

console.log(scriptNode);
export { analyserNode, bufferLength, freqDomain, scriptNode };

// buttons and UI
document.getElementById("volume").addEventListener("change", function () {
  var curr_volume = this.value;
  gainNode.gain.value = curr_volume;
});

// get ref to a div with the id of mic
var microphone_element = document.getElementById("mic");

// create a button to start/stop the stream and append it to the DOM
var button = document.createElement("button");
button.innerHTML = "Start";

button.onclick = function () {
  if (
    analyserNode !== undefined &&
    scriptNode !== undefined &&
    micStream !== null &&
    micStream.mediaStream.getAudioTracks()[0].enabled === false
  ) {
    micStream.mediaStream.getAudioTracks()[0].enabled = true;
    start(scriptNode);
    button.innerHTML = "Stop";
    console.log(micStream.mediaStream.getAudioTracks());
  } else {
    micStream.mediaStream.getAudioTracks()[0].enabled = false;
    stop();
    button.innerHTML = "Start";
    console.log(micStream.mediaStream.getAudioTracks());
  }
};

microphone_element.appendChild(button);
