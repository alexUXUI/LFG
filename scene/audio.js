import * as THREE from "three";
import { gui } from "./dat.gui.js";

const audioConfig = {
  fftSize: 2048,
};

gui
  .add(audioConfig, "fftSize", [32, 64, 128, 256, 512, 1024, 2048])
  .onChange((fftSize) => {
    audioManager.setFFTSize(fftSize);
  });

export class AudioManager {
  constructor(audio) {
    this.listener = new THREE.AudioListener();
    this.audio = new THREE.Audio(this.listener);
    this.fftSize = audioConfig.fftSize;
    this.loader = new THREE.AudioLoader();
    this.loop = true;
    this.mediaElement = audio;
    this.incomingAugio = audio;
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
      this.loader.load(this.incomingAugio, function (buffer) {
        this.audio.setBuffer(buffer);
        this.audio.setLoop(this.loop);
        this.audio.playbackRate(0.2);
        this.audio.play();
      });
    } else {
      this.mediaElement.play();
      this.audio.setMediaElementSource(this.mediaElement);
    }

    const analyser = new THREE.AudioAnalyser(this.audio, this.fftSize);

    return analyser;
  };

  voice = () => {
    // source audio from microphone and use the mediaElement
    this.mediaElement.play();
    this.audio.setMediaElementSource(this.mediaElement);
  };
}
