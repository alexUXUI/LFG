// 3rd Party Libs
import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";

// LIGHTS
import { warmLightHelper, warmLight } from "./scene/lights/warm-light.js";
import { coolLightHelper, coolLight } from "./scene/lights/cool-light.js";

// CAMERA
import { camera, rotateCameraAroundScene } from "./scene/camera.js";

// SCENE IMPORTS
import {
  Renderer,
  // renderer,
  // newRenderer
} from "./scene/renderer.js";
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
import { AudioManager, MicrophoneManager } from "./scene/audio.js";

// SCENE REFERENCE
export const scene = new THREE.Scene();

export const stopViz = () => {
  scene.remove(icosahedron);
  scene.remove(warmLight);
  scene.remove(coolLight);
  scene.remove(warmLightHelper);
  scene.remove(coolLightHelper);
  scene.remove(axesHelper);
  scene.remove(gridHelper);
  scene.remove(camera);
  scene.remove(controls.domElement);
  scene.remove(AudioManager.audioListener);
  scene.remove(MicrophoneManager.audioListener);
  scene.remove(AudioManager.audioSource);
  scene.remove(MicrophoneManager.audioSource);
  // renderer.domElement.remove();
  Renderer.destroyRenderer();
};

export const runViz = (playing) => {
  if (playing) {
    const renderer = Renderer.getOrCreateRenderer();
    console.log(renderer);
    scene.background = new THREE.Color(0x000000);

    // ADD HELPERS TO SCENE
    const allHelpers = (scene) => {
      scene.add(axesHelper);
      scene.add(warmLightHelper);
      scene.add(coolLightHelper);
      scene.add(gridHelper);
    };

    // allHelpers(scene);

    // ADD LIGHTS TO SCENE
    scene.add(warmLight);
    scene.add(coolLight);

    // ADD COMPONENTS TO SEEN
    scene.add(icosahedron);

    // Reference to the animation frame callback
    // Allows us to stop and start the animation frame callback
    let frameId;
    let microphoneMode = false;

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

          const microphone = new MicrophoneManager(stream);
          // microphone.processAudio();

          // const processor = microphone.makeProcessor();
          // console.log(processor);
        })
        .catch((err) => {
          console.error("could not connect to mic");
          console.log(err);
        });
    } else {
      var file = document.getElementById("thefile");
      var audio = document.getElementById("audio");
      file.onchange = function () {
        var files = this.files;
        audio.src = URL.createObjectURL(files[0]);

        const audioManager = new AudioManager(audio);
        const analyser = audioManager.analyser();

        audioManager.toggleMediaElement();

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
      };
    }
  } else {
    stopViz();
  }
};
