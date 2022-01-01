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
import { sourceAudio } from "./audio/source.js";

// initAudio();

console.log(sourceAudio());

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

// ANIMATION LOOP
function animate() {
  // analyser.getFrequencyData();
  // uniforms.tAudioData.value.needsUpdate = true;

  requestAnimationFrame(animate);
  animateIcosahedron();
  rotateCameraAroundScene(scene.position, camera);
  renderer.render(scene, camera);
}

// RUN THE ANIMATION LOOP
animate();
