import { start, stop } from "./render-loop.js";

// Audio element set up
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

// Audio analyser set up
function handleAudioAnalzer(files) {
  // New Audio Context
  const context = new AudioContext();

  // Ref to audio element
  const audio = document.getElementById("audio");

  // Get the audio source from the audio element
  const src = context.createMediaElementSource(audio);

  // Create the audio analyser from the audio context
  const analyser = context.createAnalyser();

  // Connect the audio source to the analyser
  src.connect(analyser);

  // Connect the analyser to the audio context destination (speakers)
  analyser.connect(context.destination);

  // Set the fourier size of the analyser
  analyser.fftSize = 2048;

  return { analyser, src, context };
}

// these are global so that they dont get recreated over and over
const { analyser, src, context } = handleAudioAnalzer();

export { analyser };
