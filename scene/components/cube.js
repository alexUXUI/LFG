import * as THREE from "three";

// CREATE CUBE
function createCube() {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
  });

  const cube = new THREE.Mesh(geometry, material);
  return cube;
}

export const cube = createCube();

// ANIMATE CUBE
export function animateCube() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
}
