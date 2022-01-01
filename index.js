// 3rd Party Libs
import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";

// LIGHTS
import { warmLightHelper, warmLight } from "./scene/lights/warm-light.js";
import { coolLightHelper, coolLight } from "./scene/lights/cool-light.js";

// CAMERA
import { camera, rotateCameraAroundScene } from "./scene/camera.js";

// SCENE IMPORTS
import { renderer } from "./scene/renderer.js";
import { controls } from "./scene/controls.js";
import { axesHelper, gridHelper } from "./scene/helpers.js";

// SCENE COMPONENTS
import {
  icosahedron,
  animateIcosahedron,
} from "./scene/components/icosahedron.js";

// DATA TRANSFORMERS
import { prepareIcosahedron } from "./transformer/icosahedron.js";

// AUDIO
import { AudioManager } from "./scene/audio.js";

// SCENE REFERENCE
export const scene = new THREE.Scene();

scene.background = new THREE.Color(0x000000);

// ADD HELPERS TO SCENE
// scene.add(axesHelper);
// scene.add(warmLightHelper);
// scene.add(coolLightHelper);
// scene.add(gridHelper);

// ADD LIGHTS TO SCENE
scene.add(warmLight);
scene.add(coolLight);

// ADD COMPONENTS TO SEEN
scene.add(icosahedron);

// Is the scene playing?
let playing = false;

// Reference to the animation frame callback
// Allows us to stop and start the animation frame callback
let frameId;

// Only start the process when the user clicks the spacebar
// document.addEventListener("keydown", (key) => {

let microphoneMode = false;

var file = document.getElementById("thefile");
var audio = document.getElementById("audio");

if (microphoneMode) {
  navigator.mediaDevices
    .getUserMedia({
      audio: {
        mandatory: {
          googEchoCancellation: "true",
          googAutoGainControl: "true",
          googNoiseSuppression: "true",
          googHighpassFilter: "true",
        },
        optional: [],
      },
      video: false,
    })
    .then(function (stream) {
      console.log("handling");
      if (window.URL) {
        console.log("srcObject");

        const context = new AudioContext();
        const source = context.createMediaStreamSource(stream);
        const processor = context.createScriptProcessor(1024, 1, 1);

        source.connect(processor);
        processor.connect(context.destination);

        var analyser = context.createAnalyser();
        analyser.smoothingTimeConstant = 0.2;
        analyser.fftSize = 128;

        const listener = new THREE.AudioListener();
        const audio = new THREE.Audio(listener);

        processor.onaudioprocess = function (e) {
          // Do something with the data, e.g. convert it to WAV
          // console.log(e.inputBuffer);
          let spectrum = new Uint8Array(analyser.frequencyBinCount);
          // getByteFrequencyData returns amplitude for each bin
          analyser.getByteFrequencyData(spectrum);
          // getByteTimeDomainData gets volumes over the sample time
          // analyser.getByteTimeDomainData(self.spectrum);
          console.log(spectrum);
        };

        var input = context.createMediaStreamSource(stream);
        input.connect(analyser);
        analyser.connect(processor);
        processor.connect(context.destination);

        //   // ANIMATION LOOP

        //   playing = true;
        // } else {
        //   console.log("src");
        //   player.src = stream;
      }
    })
    .catch((err) => {
      console.error("could not connect to mic");
      console.log(err);
    });
} else {
  file.onchange = function () {
    var files = this.files;
    audio.src = URL.createObjectURL(files[0]);

    if (audio.paused) {
      const audioManager = new AudioManager(audio);
      const analyser = audioManager.analyser();

      // ANIMATION LOOP
      function animate() {
        // AUDIO DATA
        const avgFrequencyData = analyser.getAverageFrequency();
        const frequencyData = analyser.getFrequencyData();

        // PROCESS AUDIO DATA
        const { lowerHalfArray, upperHalfArray, lowerAvg, upperAvg } =
          prepareIcosahedron(frequencyData);

        // run the loop
        frameId = requestAnimationFrame(animate);

        // adjusts the intensity of the light based on the average frequency
        coolLight.intensity = avgFrequencyData / 30;
        warmLight.intensity = avgFrequencyData / 30;

        // Animates the icosahedron
        animateIcosahedron(avgFrequencyData, frequencyData);

        // Rotates the camera around the scene
        rotateCameraAroundScene(scene.position, camera);

        // renders the scene
        renderer.render(scene, camera);
      }

      // RUN THE ANIMATION LOOP
      animate();

      playing = true;
    } else {
      while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
      }
      cancelAnimationFrame(frameId);
      playing = false;
      AudioManager.pause();
    }
  };
}
