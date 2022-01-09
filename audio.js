import { start, stop } from "./animation.js";

export function createAudio() {
  // create audio element
  const audio = document.createElement("audio");

  // append it to the body
  document.body.appendChild(audio);

  // set the audio element attributes
  audio.setAttribute("controls", "controls");
  audio.setAttribute("preload", "auto");
  audio.setAttribute("type", "audio/mpeg");
  audio.setAttribute("id", "audio");
  audio.setAttribute("class", "audio");

  // when the audio is paused, stop the animation
  audio.addEventListener("pause", stop);

  // when the audio is playing, start the animation
  audio.addEventListener("play", start);

  // keep audio above the canvas
  audio.style.zIndex = 100;
}

createAudio();

function handleAudioAnalzer(files) {
  // these are global so that they dont get recreated over and over
  var context = new AudioContext();
  const _audio = document.getElementById("audio");
  var src = context.createMediaElementSource(_audio);
  var analyser = context.createAnalyser();

  src.connect(analyser);
  analyser.connect(context.destination);

  analyser.fftSize = 2048;
  return { analyser, src, context };
}

const { analyser, src, context } = handleAudioAnalzer();

export { analyser };
