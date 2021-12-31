import * as THREE from "three";

// ICOSAHEDRON
const geometry = new THREE.IcosahedronBufferGeometry(10, 6);

var pinkMat = new THREE.MeshStandardMaterial({
  color: new THREE.Color("rgb(226,35,213)"),
  emissive: new THREE.Color("rgb(255,128,64)"),
  transparent: 1,
  opacity: 1,
});

export const icosahedron = new THREE.Mesh(geometry, pinkMat);

// ATTRIBUTES
const count = icosahedron.geometry.attributes.position.count;

const position = JSON.parse(
  JSON.stringify(icosahedron.geometry.attributes.position.array)
);

const normals = JSON.parse(
  JSON.stringify(icosahedron.geometry.attributes.normal.array)
);

const damping = 0.5;

// ANIMATE
export function animateIcosahedron() {
  const {
    geometry: { attributes },
  } = icosahedron;

  const now = Date.now() / 300;
  for (let i = 0; i < count; i++) {
    const ix = i * 3;
    const iy = i * 3 + 1;
    const iz = i * 3 + 2;

    // use uvs to calculate wave
    const uX = attributes.uv.getX(i) * Math.PI * 16;
    const uY = attributes.uv.getY(i) * Math.PI * 16;

    // calculate current vertex wave height
    const xangle = uX + now;
    const xsin = Math.sin(xangle) * damping;

    const yangle = uY + now;
    const ycos = Math.cos(yangle) * damping;

    // set new position
    attributes.position.setX(i, position[ix] + normals[ix] * (xsin + ycos));
    attributes.position.setY(i, position[iy] + normals[iy] * (xsin + ycos));
    attributes.position.setZ(i, position[iz] + normals[iz] * (xsin + ycos));
  }

  icosahedron.geometry.computeVertexNormals();
  attributes.position.needsUpdate = true;
}

icosahedron.position.set(0, 10, 0);
