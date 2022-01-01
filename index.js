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
  // icosahedron2,
  animateIcosahedron,
} from "./scene/components/icosahedron.js";

// AUDIO
import { initAudio } from "./audio/audio.js";

import file from "./audio/song.mp3";
import { AudioManager } from "./audio/source.js";

// SCENE REFERENCE
export const scene = new THREE.Scene();

scene.background = new THREE.Color(0x000000);

// ADD HELPERS TO SCENE
scene.add(axesHelper);
scene.add(gridHelper);

// ADD LIGHTS TO SCENE
scene.add(warmLight);
scene.add(warmLightHelper);
scene.add(coolLightHelper);
scene.add(coolLight);

// ADD COMPONENTS TO SEEN
scene.add(icosahedron);
// scene.add(icosahedron2);
// scene.add(box);
// scene.add(cube);

let playing = false;

// Reference to the animation frame callback
// Allows us to stop and start the animation frame callback
let frameId;

function avg(arr) {
  var total = arr.reduce(function (sum, b) {
    return sum + b;
  });
  return total / arr.length;
}

function max(arr) {
  return arr.reduce(function (a, b) {
    return Math.max(a, b);
  });
}

function fractionate(val, minVal, maxVal) {
  return (val - minVal) / (maxVal - minVal);
}

function modulate(val, minVal, maxVal, outMin, outMax) {
  var fr = fractionate(val, minVal, maxVal);
  var delta = outMax - outMin;
  return outMin + fr * delta;
}

document.addEventListener("keydown", (key) => {
  if (key.key === " ") {
    // window.addEventListener("click", () => {
    if (!playing) {
      // const analyser = sourceAudio();

      const audioManager = new AudioManager();
      audioManager.play();
      const analyser = audioManager.analyser();

      // ANIMATION LOOP
      function animate() {
        // Derive the frequency data from the current audio source

        const avgFrequencyData = analyser.getAverageFrequency();
        // console.log(avgFrequencyData);

        const frequencyData = analyser.getFrequencyData();

        // PREPARE AUDIO DATA
        const lowerHalfArray = frequencyData.slice(
          0,
          frequencyData.length / 2 - 1
        );
        const upperHalfArray = frequencyData.slice(
          frequencyData.length / 2 - 1,
          frequencyData.length - 1
        );

        const overallAvg = avg(frequencyData);

        const lowerMax = max(lowerHalfArray);
        const lowerAvg = avg(lowerHalfArray);
        const upperMax = max(upperHalfArray);
        const upperAvg = avg(upperHalfArray);

        const lowerMaxFr = lowerMax / lowerHalfArray.length;
        const lowerAvgFr = lowerAvg / lowerHalfArray.length;
        const upperMaxFr = upperMax / upperHalfArray.length;
        const upperAvgFr = upperAvg / upperHalfArray.length;

        // run the loop
        frameId = requestAnimationFrame(animate);

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
      cancelAnimationFrame(frameId);
      playing = false;
      AudioManager.pause();
      while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
      }
    }
  }
});
