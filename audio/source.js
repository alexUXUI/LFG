import * as THREE from "three";
import file from "./motzart.mp3";
import { gui } from "../scene/dat.gui.js";

const audioConfig = {
  fftSize: 2048,
};

gui
  .add(audioConfig, "fftSize", [32, 64, 128, 256, 512, 1024, 2048])
  .onChange((fftSize) => {
    audioManager.setFFTSize(fftSize);
  });

let playing = false;

export class AudioManager {
  constructor() {
    this.listener = new THREE.AudioListener();
    this.audio = new THREE.Audio(this.listener);
    this.fftSize = audioConfig.fftSize;
    this.loader = new THREE.AudioLoader();
    this.loop = true;
    this.mediaElement = new Audio(file);
  }

  setFFTSize(fftSize) {
    this.fftSize = fftSize;
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

export const audioManager = new AudioManager();
