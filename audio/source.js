import * as THREE from "three";
import file from "./motzart.mp3";

let playing = false;

export class AudioManager {
  constructor() {
    this.listener = new THREE.AudioListener();
    this.audio = new THREE.Audio(this.listener);
    this.fftSize = 2048;
    this.loader = new THREE.AudioLoader();
    this.loop = true;
    this.mediaElement = new Audio(file);
  }

  play() {
    if (this.audio) {
      this.audio.play();
    }
  }

  pause() {
    if (this.audio) {
      this.audio.pause();
    }
  }

  analyser = () => {
    if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) {
      this.loader.load(file, function (buffer) {
        this.audio.setBuffer(buffer);
        sound.setLoop(this.loop);
        // this.audio.play();
      });
    } else {
      this.mediaElement.play();
      this.audio.setMediaElementSource(this.mediaElement);
    }

    const analyser = new THREE.AudioAnalyser(this.audio, this.fftSize);

    return analyser;
  };
}
