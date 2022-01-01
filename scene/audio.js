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

export class MicrophoneManager {
  constructor(stream) {
    // new audio context
    this.context = new AudioContext();

    // new audio analyzer
    this.analyser = this.context.createAnalyser();
    this.analyser.smoothingTimeConstant = 0.2;
    this.analyser.fftSize = 2048;

    // connect the context to the processor
    this.processor = this.context.createScriptProcessor(2048, 1, 1);

    // create audio source from stream
    this.source = this.context.createMediaStreamSource(stream);

    // connect the source to the analyser
    this.source.connect(this.analyser);

    // connect the analyser to the processor
    this.analyser.connect(this.processor);

    // connect the processor to the destination
    this.processor.connect(this.context.destination);

    this.processor.onaudioprocess = (e) => this.processAudio(e, this.analyser);

    this.spectrum = new Uint8Array(this.analyser.frequencyBinCount);
  }

  processAudio(e, analyser) {
    // getByteFrequencyData returns amplitude for each bin
    // analyser.getByteFrequencyData(spectrum);
    // getByteTimeDomainData gets volumes over the sample time
    this.analyser.getByteTimeDomainData(this.spectrum);
    // console.log(this.spectrum);
  }

  makeProcessor() {
    return this.processor;
  }
}
