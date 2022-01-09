export function createAudio() {
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
