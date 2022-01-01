import * as THREE from "three";
import file from "./song.mp3";

let playing = false;

export const sourceAudio = () => {
  window.addEventListener("click", () => {
    const listener = new THREE.AudioListener();
    const audio = new THREE.Audio(listener);
    const fftSize = 128;

    if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) {
      const loader = new THREE.AudioLoader();
      loader.load(file, function (buffer) {
        audio.setBuffer(buffer);
        sound.setLoop(true);
        if (!playing) {
          audio.play();
        } else {
          audio.pause();
        }
      });
    } else {
      const mediaElement = new Audio(file);
      mediaElement.play();
      audio.setMediaElementSource(mediaElement);
    }

    const analyser = new THREE.AudioAnalyser(audio, fftSize);

    // get the average frequency of the sound
    // const data = analyser.getAverageFrequency();

    return analyser;
  });
};
