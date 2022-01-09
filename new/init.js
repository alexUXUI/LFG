import { createAudio } from "./file-audio/audio.js";
import { initMic } from "./mic-audio/microphone.js";

// handle the window onload event
export function handleOnLoad() {
  initMic();

  const { file, audio } = getAudioAndFile();

  file.onchange = function () {
    var files = this.files;
    handleFileChange(files, audio);
  };
}

// when a file is uploaded, connect it to the audio element
function handleFileChange(files, audio) {
  audio.src = URL.createObjectURL(files[0]);
  audio.load();
}

// get audio and file upload elements
function getAudioAndFile() {
  const file = document.getElementById("thefile");
  const audio = document.getElementById("audio");

  return { file, audio };
}
