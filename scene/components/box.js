import * as THREE from "three";

// GEOMETRY - starting with a cube
export const geometry = new THREE.BoxGeometry(1, 1, 1);

// check out the position attribute of a cube
var position = geometry.getAttribute("position");
console.log("position count: ", position.count); // 24
console.log("position array length: ", position.array.length); // 72

// divide the array length by 3 to get the number of vertices
const veticeNumber = position.count * 3;

const index = geometry.getIndex();

console.log("geometry index count: ", index.count); // 36

const numberOfFaces = 6;
const numberOfTrianglesPerFace = 2;
const numnberOfTriangles = numberOfFaces * numberOfTrianglesPerFace;
const numberOfTriangles2 = geometry.index.count / 3;

// mutating a position
// var vertIndex = index.array[0] * 3;
// position.array[vertIndex] = 1;
// position.needsUpdate = true;

// console.log(index.array);

// index.array[0] = 2.3;
// position.needsUpdate = true;
// index.array[1] = 2.3;
// position.needsUpdate = true;
// index.array[2] = 2.3;

// position.needsUpdate = true;

// use the geometry with a mesh
export const box = new THREE.Mesh(
  geometry,
  new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide,
  })
);

// scene.add(mesh);
// // camera, render
// var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
// camera.position.set(2, 2, 2);
// camera.lookAt(mesh.position);
// var renderer = new THREE.WebGLRenderer();
// renderer.setSize(640, 480);
// document.getElementById("demo").appendChild(renderer.domElement);

// renderer.render(scene, camera);
