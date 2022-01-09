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
  // analyser.connect(micCtx.destination);

  // mic.mediaStream.getAudioTracks()[0].enabled = false;

  // function play() {
  //   analyser.getByteFrequencyData(data);
  //   console.log(data);
  //   requestAnimationFrame(play);
  // }

  // play();

  start();
}

export function startMic() {
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
  }
}

export function initMic() {
  // create a button to start the mic and append it to a div with id of "mic"
  const micButton = document.createElement("button");
  micButton.innerText = "Start Mic";
  micButton.addEventListener("click", startMic);

  // append button to div of id "mic"
  const mic = document.getElementById("mic");
  mic.appendChild(micButton);

  // create a button to stop the mic and append it to the DOM
  const stopMicButton = document.createElement("button");
  stopMicButton.innerText = "Stop Mic";
  stopMicButton.addEventListener("click", handleMicStop);
  mic.appendChild(stopMicButton);
}

const yo = "yo";

// export { micCtx, analyser, data, yo };

export { analyser, bufferLength, dataArray };

// const audioContext = new AudioContext();

// const BUFF_SIZE_RENDERER = 16384;

// let micStream = null;

// let gainNode = audioContext.createGain();
// gainNode.connect(audioContext.destination);

// const analyserNode = audioContext.createAnalyser();
// analyserNode.smoothingTimeConstant = 0;
// analyserNode.fftSize = 2048;

// const bufferLength = analyserNode.frequencyBinCount;
// const freqDomain = new Uint8Array(bufferLength);
// const timeDomain = new Uint8Array(bufferLength);

// const scriptNode = audioContext.createScriptProcessor(2048, 1, 1);

// scriptNode.connect(gainNode);

// if (!navigator.getUserMedia)
//   navigator.getUserMedia =
//     navigator.getUserMedia ||
//     navigator.webkitGetUserMedia ||
//     navigator.mozGetUserMedia ||
//     navigator.msGetUserMedia;

// function handleStream(stream) {
//   micStream = audioContext.createMediaStreamSource(stream);
//   micStream.connect(gainNode);

//   // pause the stream
//   micStream.mediaStream.getAudioTracks()[0].enabled = false;

//   micStream.connect(analyserNode);

//   analyserNode.connect(scriptNode);

//   scriptNode.onaudioprocess = function (e) {
//     analyserNode.getByteTimeDomainData(timeDomain);
//     analyserNode.getByteFrequencyData(freqDomain);
//     // console.log(freqDomain);
//   };
// }

// function handleError(error) {
//   console.error("Error capturing audio.");
// }

// export function initMic(stream) {
//   if (navigator.getUserMedia) {
//     navigator.getUserMedia({ audio: true }, handleStream, handleError);
//   } else {
//     console.error("getUserMedia not supported in this browser.");
//   }
// }

// console.log(scriptNode);
// export { analyserNode, bufferLength, freqDomain, scriptNode };

// // buttons and UI
// document.getElementById("volume").addEventListener("change", function () {
//   var curr_volume = this.value;
//   gainNode.gain.value = curr_volume;
// });
