import * as THREE from "three";

const aspectRatio = window.innerWidth / window.innerHeight;
const fieldOfView = 60;
const near = 0.1;
const far = 1000;

export const camera = new THREE.PerspectiveCamera(
  fieldOfView,
  aspectRatio,
  near,
  far
);

const cameraAngle = [100, 20, 10];

camera.position.set(...cameraAngle);
