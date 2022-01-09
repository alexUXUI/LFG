console.log("audio is starting up ...");

import { start, stop } from "./render-loop.js";

const BUFF_SIZE_RENDERER = 16384;
const audioContext = new AudioContext();

let audioInput = null;
let micStream = null;

let gainNode = audioContext.createGain();
gainNode.connect(audioContext.destination);

let scriptProcessorNode = null;
let scriptProcessorAnalysisNode = null;

let analyserNode = audioContext.createAnalyser();
analyserNode.smoothingTimeConstant = 0;
analyserNode.fftSize = 2048;

const bufferLength = analyserNode.frequencyBinCount;
const freqDomain = new Uint8Array(bufferLength);
const array_time_domain = new Uint8Array(bufferLength);

if (!navigator.getUserMedia)
  navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;

export function initMic(stream) {
  if (navigator.getUserMedia) {
    navigator.getUserMedia(
      { audio: true },
      function (stream) {
        micStream = audioContext.createMediaStreamSource(stream);
        micStream.connect(gainNode);

        scriptProcessorNode = audioContext.createScriptProcessor(
          BUFF_SIZE_RENDERER,
          1,
          1
        );

        micStream.connect(scriptProcessorNode);

        // pause the stream
        micStream.mediaStream.getAudioTracks()[0].enabled = false;

        document
          .getElementById("volume")
          .addEventListener("change", function () {
            var curr_volume = this.value;
            gainNode.gain.value = curr_volume;
          });

        scriptProcessorAnalysisNode = audioContext.createScriptProcessor(
          2048,
          1,
          1
        );

        scriptProcessorAnalysisNode.connect(gainNode);

        micStream.connect(analyserNode);

        analyserNode.connect(scriptProcessorAnalysisNode);

        scriptProcessorAnalysisNode.onaudioprocess = function () {
          // get the average for the first channel
          analyserNode.getByteFrequencyData(freqDomain);
          analyserNode.getByteTimeDomainData(array_time_domain);

          // console.log(freqDomain);
        };

        // get ref to a div with the id of mic
        var microphone_element = document.getElementById("mic");

        // create a button to start/stop the stream and append it to the DOM
        var button = document.createElement("button");
        button.innerHTML = "Start";
        button.onclick = function () {
          if (micStream.mediaStream.getAudioTracks()[0].enabled === false) {
            micStream.mediaStream.getAudioTracks()[0].enabled = true;
            start();
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
      },
      (e) => console.error("Error capturing audio.")
    );
  } else {
    console.error("getUserMedia not supported in this browser.");
  }
}

export { analyserNode, bufferLength, freqDomain };
