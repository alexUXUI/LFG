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
  constructor(audio, type) {
    this.listener = new THREE.AudioListener();
    this.audio = new THREE.Audio(this.listener);
    this.fftSize = audioConfig.fftSize;
    if (type === "mic") {
      // this.mediaElement = this.audio;
      // this.mediaElement.srcObject = this.audio.srcObject;
      // this.mediaElement.play();

      let stream = audio;

      const tracks = stream.getAudioTracks();

      console.log(tracks);

      console.log("mic!!!!");

      console.log(typeof audio);
      console.log(audio);

      // const listener = new THREE.AudioListener();
      // const analyser = new THREE.AudioAnalyser(, this.fftSize);
      // audioContext.createMediaStreamSource(stream);
      // const _audio = new THREE.Audio(listener);
      // const context = listener.context;
      // const source = context.createMediaElementSource(_audio);

      // audio.setNodeSource(source);
    } else {
      this.loader = new THREE.AudioLoader();
      this.loop = true;
      this.mediaElement = audio;
      this.incomingAudio = audio;
    }
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

  analyser = (type) => {
    if (!type || type !== "mic") {
      try {
        if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) {
          this.loader.load(this.incomingAudio, function (buffer) {
            this.audio.setBuffer(buffer);
            this.audio.setLoop(this.loop);
            this.audio.playbackRate(0.2);
            this.audio.play();
          });
        } else {
          // this.mediaElement.play();
          this.audio.setMediaElementSource(this.mediaElement);
        }
        const analyser = new THREE.AudioAnalyser(this.audio, this.fftSize);

        return analyser;
      } catch (e) {
        console.log(e);

        return "could not make analyser";
      }
    } else {
      const analyser = new THREE.AudioAnalyser(this.audio, this.fftSize);
      return analyser;
    }
  };

  voice = () => {
    // source audio from microphone and use the mediaElement
    this.mediaElement.play();
    this.audio.setMediaElementSource(this.mediaElement);
  };
}
