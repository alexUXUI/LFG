import * as THREE from "three";
import { gui } from "../dat.gui.js";

export const warmLight = new THREE.PointLight(0xffffff, 1, 100);

const wamrLight = {
  x: 2,
  y: 3,
  z: 4,
  color: 0xffffff,
};

const { x, y, z } = wamrLight;

warmLight.position.set(x, y, z);

export const warmLightHelper = new THREE.PointLightHelper(warmLight, 2);

const config = gui.addFolder("Warm light");

config.add(warmLight, "intensity", 0, 2);

config.add(wamrLight, "x", -10, 10).onChange((x) => {
  warmLight.position.set(x, y, z);
});

config.add(wamrLight, "y", -10, 10).onChange((y) => {
  warmLight.position.set(x, y, z);
});

config.add(wamrLight, "z", -10, 10).onChange((z) => {
  warmLight.position.set(x, y, z);
});

config.addColor(wamrLight, "color").onChange(function (value) {
  warmLight.color.set(value);
});
