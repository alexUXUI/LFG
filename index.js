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

const player = document.getElementById("audio");

const handleSuccess = function (stream) {
  console.log("handling");
  if (window.URL) {
    console.log("srcObject");
    player.srcObject = stream;

    // const context = new AudioContext();
    // const source = context.createMediaStreamSource(stream);
    // source.connect(analyser);

    // var analyser = context.createAnalyser();

    // analyser.fftSize = 2048;
    // var bufferLength = analyser.frequencyBinCount;
    // var dataArray = new Uint8Array(bufferLength);
    ///

    const context = new AudioContext();
    const src = context.createMediaStreamSource(stream);
    const analyser = context.createAnalyser();

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 2048;

    const bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);

    const dataArray = new Uint8Array(bufferLength);
  } else {
    console.log("src");
    player.src = stream;
  }
};

navigator.mediaDevices
  .getUserMedia({ audio: true, video: false })
  .then(handleSuccess);

var file = document.getElementById("thefile");
var audio = document.getElementById("audio");

file.onchange = function () {
  var files = this.files;
  audio.src = URL.createObjectURL(files[0]);

  console.log(audio);

  // if (key.key === " ") {
  if (audio.paused) {
    const audioManager = new AudioManager(audio);
    // AudioManager.play();
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
  // }
};
// });
