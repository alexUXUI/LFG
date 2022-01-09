import { createAudio } from "./audio.js";
import { start, stop } from "./animation.js";

function getAudioAndFile() {
  const file = document.getElementById("thefile");
  const audio = document.getElementById("audio");

  return { file, audio };
}

const { file, audio } = getAudioAndFile();

// handle the window onload event
export function handleOnLoad() {
  file.onchange = function () {
    var files = this.files;
    handleFileChange(files);
  };
}

// connect the file to the audio element
function connectFileToAudio(files, audio) {
  audio.src = URL.createObjectURL(files[0]);
  audio.load();
}

// when a file is uploaded, connect it to the audio element
function handleFileChange(files) {
  const audio = document.getElementById("audio");
  connectFileToAudio(files, audio);
}

// when the audio is paused, stop the animation
audio.addEventListener("pause", stop);

// when the audio is playing, start the animation
audio.addEventListener("play", start);
