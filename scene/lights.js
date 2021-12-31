import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export function directLightOne(scene) {
  // // AMBIENT LIGHT
  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  // DIRECTIONAL LIGHT
  const dirLight = new THREE.DirectionalLight(0xf0f2bb, 1.0);

  dirLight.position.x += 20;
  dirLight.position.y += 20;
  dirLight.position.z += 20;

  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 4096;
  dirLight.shadow.mapSize.height = 4096;

  const d = 25;

  dirLight.shadow.camera.left = -d;
  dirLight.shadow.camera.right = d;
  dirLight.shadow.camera.top = d;
  dirLight.shadow.camera.bottom = -d;
  dirLight.position.z = -30;

  let target = new THREE.Object3D();

  target.position.z = -20;
  dirLight.target = target;
  dirLight.target.updateMatrixWorld();

  // dirLight.shadow.camera.lookAt(30, 100, 4);
  // scene.add(dirLight);
  // scene.add(new THREE.CameraHelper(dirLight.shadow.camera));
  return dirLight;
}
