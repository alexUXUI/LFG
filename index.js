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
import { box } from "./scene/components/box.js";
import { gui } from "./scene/dat.gui.js";

// SCENE
export const scene = new THREE.Scene();

scene.background = new THREE.Color(0xeaeaea);

// ADD HELPERS
scene.add(axesHelper);
scene.add(gridHelper);

// ADD LIGHTS
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
console.log(Object.entries(pointLight.position));
scene.add(pointLight);

const lightConfig = {
  x: 2,
  y: 3,
  z: 4,
  color: 0xffffff,
};

const { x, y, z } = lightConfig;

pointLight.position.set(x, y, z);

const config = gui.addFolder("point light 1");

config.open();

config.add(pointLight, "intensity", 0, 2);

config.add(lightConfig, "x", -360, 360).onChange((x) => {
  pointLight.position.set(x, y, z);
});

config.add(lightConfig, "y", -360, 360).onChange((y) => {
  pointLight.position.set(x, y, z);
});

config.add(lightConfig, "z", 0, 100).onChange((z) => {
  pointLight.position.set(x, y, z);
});

config.addColor(lightConfig, "color").onChange(function (value) {
  pointLight.color.set(value);
});

const pointLightHelper = new THREE.PointLightHelper(pointLight, 2);
pointLightHelper.color = 0xff0000;

scene.add(pointLightHelper);

// ADD COMPONENTS
// scene.add(cube);
scene.add(icosahedron);
// scene.add(box);

var angle = 0;
var radius = 20;

var rotSpeed = 0.002;

function checkRotation() {
  var x = camera.position.x,
    y = camera.position.y,
    z = camera.position.z;

  camera.position.x = x * Math.cos(rotSpeed) + z * Math.sin(rotSpeed);
  camera.position.z = z * Math.cos(rotSpeed) - x * Math.sin(rotSpeed);

  camera.lookAt(scene.position);
}

function animate() {
  requestAnimationFrame(animate);
  // camera.position.x = radius * Math.cos(angle);
  // camera.position.z = radius * Math.sin(angle);
  // angle += 0.01;
  renderer.render(scene, camera);
  animateIcosahedron();
  checkRotation();
}

animate();
