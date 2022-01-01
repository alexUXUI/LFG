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

import file from "./audio/song.mp3";
import { audioManager } from "./audio/source.js";

// SCENE REFERENCE
export const scene = new THREE.Scene();

scene.background = new THREE.Color(0x000000);

// ADD HELPERS TO SCENE
scene.add(axesHelper);
scene.add(warmLightHelper);
scene.add(coolLightHelper);
scene.add(gridHelper);

// ADD LIGHTS TO SCENE
scene.add(warmLight);

scene.add(coolLight);

// ADD COMPONENTS TO SEEN
scene.add(icosahedron);

let playing = false;

// Reference to the animation frame callback
// Allows us to stop and start the animation frame callback
let frameId;

document.addEventListener("keydown", (key) => {
  if (key.key === " ") {
    if (!playing) {
      audioManager.play();
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
      audioManager.pause();
    }
  }
});
