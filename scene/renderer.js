import * as THREE from "three";

export class RendererManager {
  constructor() {
    this.createRenderer();
  }

  getDOMElement() {
    return this.renderer.domElement;
  }

  createRenderer() {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.appendRendererToDOM();

    return this.renderer;
  }

  appendRendererToDOM() {
    const container = document.getElementById("screen--start");
    container.appendChild(this.renderer.domElement);
  }

  destroyRenderer() {
    this.renderer.domElement.remove();
    this.renderer = undefined;
  }

  createOrDestroyRenderer(isPlaying) {
    if (isPlaying) {
      this.destroyRenderer();
    } else {
      this.createRenderer();
    }
  }

  getOrCreateRenderer() {
    if (this.renderer) {
      return this.renderer;
    } else {
      this.createRenderer();
      return this.renderer;
    }
  }

  getOrCreateDOMElement() {
    if (this.renderer) {
      return this.renderer.domElement;
    } else {
      this.createRenderer();
      return this.renderer.domElement;
    }
  }
}

export const Renderer = new RendererManager();

export const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
const container = document.getElementById("screen--start");
container.appendChild(renderer.domElement);
