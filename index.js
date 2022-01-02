// 3rd Party Libs
import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";

// LIGHTS
import { warmLightHelper, warmLight } from "./scene/lights/warm-light.js";
import { coolLightHelper, coolLight } from "./scene/lights/cool-light.js";
import { axesHelper, gridHelper } from "./scene/helpers.js";

// CAMERA
import { camera, rotateCameraAroundScene } from "./scene/camera.js";

// SCENE COMPONENTS
import {
  animateIcosahedron,
  icosahedron,
  renderIcosahedron,
} from "./scene/components/icosahedron.js";

// DATA TRANSFORMERS
import { prepareIcosahedron } from "./transformer/icosahedron.js";

// AUDIO
import { AudioManager, MicrophoneManager } from "./scene/audio.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// POST PROCESSING
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass.js";

// Dat GUI
import { gui } from "./scene/dat.gui.js";

// Renderer
export const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Scene
export const scene = new THREE.Scene();

const sceneConfig = {
  ambientLight: 0xffffff,
  background: 0x000000,
  withHelpers: false,
};

// Refs to audio and file HTML elements
const file = document.getElementById("thefile");
const audio = document.getElementById("audio");
const audioManager = new AudioManager(audio);
const analyser = audioManager.analyser();

export const runViz = (playing) => {
  scene.background = new THREE.Color(sceneConfig.background);
  scene.add(pointsMesh);

  // Make Particle System
  const particlesGeometry = new THREE.BufferGeometry;
  const particlesCount = 5000;

  // x, y, z for all particles
  const positionArray = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i++) {
    positionArray[i] = Math.random();
  }

  console.log(positionArray);

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positionArray, 3)
  );

  const pointsMaterial = new THREE.PointsMaterial({
    size: 0.1,
  });

  const pointsMesh = new THREE.Points(particlesGeometry, pointsMaterial);

  const controls = new OrbitControls(camera, renderer.domElement);

  // ADD LIGHTS TO SCENE
  scene.add(warmLight);
  scene.add(coolLight);

  // ADD COMPONENTS TO SEEN
  scene.add(icosahedron);

  file.onchange = function () {
    var files = this.files;
    audio.src = URL.createObjectURL(files[0]);

    audioManager.toggleMediaElement();

    var stopped;
    var requestId = 0;
    var starttime;

    function render(time) {
      if (!stopped) {
        requestId = window.requestAnimationFrame(render);

        // controls.update();
        // AUDIO DATA
        const avgFrequencyData = analyser.getAverageFrequency();
        const frequencyData = analyser.getFrequencyData();

        // PROCESS AUDIO DATA
        const { lowerHalfArray, upperHalfArray, lowerAvg, upperAvg } =
          prepareIcosahedron(frequencyData);

        // adjusts the intensity of the light based on the average frequency
        coolLight.intensity = avgFrequencyData / 30;
        warmLight.intensity = avgFrequencyData / 30;

        // Animates the icosahedron
        animateIcosahedron(avgFrequencyData, frequencyData);

        // Rotates the camera around the scene
        rotateCameraAroundScene(scene.position, camera);

        // renders the scene
        renderer.render(scene, camera);
      } else {
        cancelAnimationFrame(requestId);
      }
    }

    function start() {
      starttime = Date.now();
      requestId = window.requestAnimationFrame(render);
      stopped = false;
    }

    function stop() {
      if (requestId) {
        window.cancelAnimationFrame(requestId);
      }
      stopped = true;
    }

    window.stopAnimation = stop;

    start();
  };
};

const config = gui.addFolder("Scene");

config.add(sceneConfig, "withHelpers").onChange((value) => {
  if (value) {
    scene.add(axesHelper);
    scene.add(gridHelper);
    scene.add(warmLightHelper);
    scene.add(coolLightHelper);
  } else {
    scene.remove(axesHelper);
    scene.remove(gridHelper);
    scene.remove(warmLightHelper);
    scene.remove(coolLightHelper);
  }
});

config.addColor(sceneConfig, "background").onChange(function (value) {
  scene.background.set(value);
  const audioVisualizer = document.querySelector(".audioVisualizer");

  // convert value to hexadecimal
  const hex = value.toString(16);
  // add hash to hexadecimal
  const hexWithHash = "#" + hex;
  // set background color
  audioVisualizer.style.backgroundColor = hexWithHash;
});
