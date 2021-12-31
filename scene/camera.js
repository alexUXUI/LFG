import * as THREE from "three";

const aspectRatio = window.innerWidth / window.innerHeight;
const fieldOfView = 50;
const near = 0.1;
const far = 1000;

export const camera = new THREE.PerspectiveCamera(
  fieldOfView,
  aspectRatio,
  near,
  far
);

const cameraAngle = [0, 20, 35];

camera.position.set(0, 20, 35);
