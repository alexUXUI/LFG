import * as THREE from "three";
import { gui } from "./dat.gui";

const config = gui.addFolder("Camera");

// config.open();

const cameraConfig = {
  fieldOfView: 50,
  aspectRatio: window.innerWidth / window.innerHeight,
  near: 0.1,
  far: 1000,
  x: 0,
  y: 20,
  z: 35,
};

const { fieldOfView, aspectRatio, near, far, x, y, z } = cameraConfig;

export const camera = new THREE.PerspectiveCamera(
  fieldOfView,
  aspectRatio,
  near,
  far
);

config.add(cameraConfig, "fieldOfView", 2, 200).onChange((value) => {
  camera.fov = value;
  camera.updateProjectionMatrix();
});

config.add(cameraConfig, "aspectRatio", 0.1, 10).onChange((value) => {
  camera.aspect = value;
  camera.updateProjectionMatrix();
});

config.add(cameraConfig, "near", 0.1, 100).onChange((value) => {
  camera.near = value;
  camera.updateProjectionMatrix();
});

config.add(cameraConfig, "far", 0.1, 100).onChange((value) => {
  camera.far = value;
  camera.updateProjectionMatrix();
});

config.add(cameraConfig, "x", -100, 100).onChange((value) => {
  camera.position.x = value;
});

config.add(cameraConfig, "y", -100, 100).onChange((value) => {
  camera.position.y = value;
});

config.add(cameraConfig, "z", -100, 100).onChange((value) => {
  camera.position.z = value;
});

const cameraAngle = [x, y, z];

camera.position.set(x, y, z);

export const rotateCameraAroundScene = (focalPoint, camera) => {
  var angle = 0;
  var radius = 20;
  var rotSpeed = 0.002;

  var x = camera.position.x,
    y = camera.position.y,
    z = camera.position.z;

  camera.position.x = x * Math.cos(rotSpeed) + z * Math.sin(rotSpeed);
  camera.position.z = z * Math.cos(rotSpeed) - x * Math.sin(rotSpeed);

  camera.lookAt(focalPoint);
};
