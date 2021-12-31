import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { gui } from "./dat.gui.js";
export const coolPointLight = new THREE.PointLight(0xffffff, 1, 100);
console.log(Object.entries(coolPointLight.position));

const coolLight = {
  x: -2,
  y: -3,
  z: -4,
  color: 0x3000ff,
};

const { x, y, z } = coolLight;

coolPointLight.position.set(x, y, z);

const config = gui.addFolder("Cool Light");

// config.open();

config.add(coolPointLight, "intensity", 0, 1);

config.add(coolLight, "x", -10, 10).onChange((x) => {
  coolPointLight.position.set(x, y, z);
});

config.add(coolLight, "y", -10, 10).onChange((y) => {
  coolPointLight.position.set(x, y, z);
});

config.add(coolLight, "z", -10, 10).onChange((z) => {
  coolPointLight.position.set(x, y, z);
});

config.addColor(coolLight, "color").onChange(function (value) {
  coolPointLight.color.set(value);
});

export const coolPointLightHelper = new THREE.PointLightHelper(
  coolPointLight,
  2
);
coolPointLightHelper.color = 0xff0000;
