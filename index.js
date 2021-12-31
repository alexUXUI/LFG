// 3rd Party Libs
import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";

// Scene Setup
import { directLightOne } from "./scene/lights.js";
import { camera } from "./scene/camera.js";
import { renderer } from "./scene/renderer.js";
import { controls } from "./scene/controls.js";
import { axesHelper, gridHelper } from "./scene/helpers.js";

// Scene Components
import { cube, animateCube } from "./scene/components/cube.js";
import {
  icosahedron,
  animateIcosahedron,
} from "./scene/components/icosahedron.js";

// SCENE
export const scene = new THREE.Scene();

// ADD HELPERS
scene.add(axesHelper);
scene.add(gridHelper);

// ADD LIGHTS
scene.add(directLightOne(scene));

// ADD COMPONENTS
// scene.add(cube);
scene.add(icosahedron);

// RUN THE ANIMATION LOOP
function animate() {
  requestAnimationFrame(animate);
  animateCube();
  animateIcosahedron();
  renderer.render(scene, camera);
}

animate();
