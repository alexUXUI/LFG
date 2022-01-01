import * as THREE from "three";
import { gui } from "../dat.gui.js";

// INITIALIZE LIGHT
export const coolLight = new THREE.PointLight(0xffffff, 1, 100);

// LIGHT CONFIGS
const coolLightConfig = {
  x: -2,
  y: -3,
  z: -4,
  color: 0x3000ff,
};

const { x, y, z } = coolLightConfig;

// SET LIGHT POSITION
coolLight.position.set(x, y, z);

// LIGHT HELPER
export const coolLightHelper = new THREE.PointLightHelper(coolLight, 2);

// CONFIGURE LIGHT WITH DAT GUI
const config = gui.addFolder("Cool Light");

config.add(coolLight, "intensity", 0, 1);

config.add(coolLightConfig, "x", -10, 10).onChange((x) => {
  coolLight.position.set(x, y, z);
});

config.add(coolLightConfig, "y", -10, 10).onChange((y) => {
  coolLight.position.set(x, y, z);
});

config.add(coolLightConfig, "z", -10, 10).onChange((z) => {
  coolLight.position.set(x, y, z);
});

config.addColor(coolLightConfig, "color").onChange(function (value) {
  coolLight.color.set(value);
});