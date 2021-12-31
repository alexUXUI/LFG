import * as THREE from "three";
import { gui } from "../dat.gui.js";

const icosahedronFolder = gui.addFolder("Icosahedron");

icosahedronFolder.open();

const config = {
  xAngleFunction: "sin",
  yAngleFunction: "cos",
  size: 2,
  detail: 5,
};

gui.add(config, "xAngleFunction", {
  sin: "sin",
  cos: "cos",
  tanh: "tanh",
  tan: "tan",
});

gui.add(config, "yAngleFunction", {
  sin: "sin",
  cos: "cos",
  tanh: "tanh",
  tan: "tan",
});

// GEOMETRY
const geometry = new THREE.IcosahedronBufferGeometry(
  config.size,
  config.detail
);

gui.add(config, "size", 0, 10).onChange((size) => {
  geometry.setAttribute("size", size);
  geometry.attributes.size.needsUpdate = true;
});

gui.add(config, "detail", 0, 10).onChange((detail) => {
  console.log(detail);
  geometry.setAttribute("detail", detail);
  geometry.attributes.detail.needsUpdate = true;
});

// MATERIAL
var pinkMat = new THREE.MeshPhongMaterial({
  color: new THREE.Color("rgb(100,100,100)"),
  emissive: new THREE.Color("rgb(10,10,10)"),
  transparent: 1,
  opacity: 1,
  shininess: 100,
});

// ICOSAHEDRON (MESH = GEOMETRY + MATERIAL)
export const icosahedron = new THREE.Mesh(geometry, pinkMat);

/**
 * ICOSAHEDRON ATTRIBUTES
 * Used to get / organize the data associated with the icosahedron
 * This data includes the vertices, and normals of the icosahedron
 *
 * Normals: The values in this attribute are used to find out what the direction
 * is of each point of each triangle in an instance of buffer geometry
 * https://dustinpfister.github.io/2021/06/08/threejs-buffer-geometry-attributes-normals/
 *
 * Postions: it is an array that holds all the values of each point in space
 * https://dustinpfister.github.io/2021/06/07/threejs-buffer-geometry-attributes-position/
 **/
const count = icosahedron.geometry.attributes.position.count;

const position = JSON.parse(
  JSON.stringify(icosahedron.geometry.attributes.position.array)
);

const normals = JSON.parse(
  JSON.stringify(icosahedron.geometry.attributes.normal.array)
);

const damping = 0.2;

// ANIMATE
export function animateIcosahedron() {
  // console.log(config);
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
    const xsin = Math[config.xAngleFunction](xangle) * damping;

    const yangle = uY + now;
    const ycos = Math[config.yAngleFunction](yangle) * damping;

    // set new position
    attributes.position.setX(i, position[ix] + normals[ix] * (xsin + ycos));
    attributes.position.setY(i, position[iy] + normals[iy] * (xsin + ycos));
    attributes.position.setZ(i, position[iz] + normals[iz] * (xsin + ycos));
  }

  icosahedron.geometry.computeVertexNormals();
  attributes.position.needsUpdate = true;
}

icosahedron.position.set(0, 0, 0);