import * as THREE from "three";

// RENDERER
// export const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// export const newRenderer = () => {
//   export const renderer = new THREE.WebGLRenderer();
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   document.body.appendChild(renderer.domElement);
// };

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
  }

  appendRendererToDOM() {
    document.body.appendChild(this.renderer.domElement);
  }

  destroyRenderer() {
    this.renderer.domElement.remove();
    this.renderer = undefined;
  }

  createOrDestroyRenderer() {
    if (this.renderer) {
      this.destroyRenderer();
    } else {
      this.createRenderer();
    }
  }

  getOrCreateRenderer() {
    if (this.renderer) {
      console.log("Renderer already exists");
      return this.renderer;
    } else {
      console.log("Renderer not found. Creating new renderer.");
      this.createRenderer();
      return this.renderer;
    }
  }

  getOrCreateDOMElement() {
    if (this.renderer) {
      console.log("Renderer already exists");
      return this.renderer.domElement;
    } else {
      console.log("Renderer not found. Creating new renderer.");
      this.createRenderer();
      return this.renderer.domElement;
    }
  }
}

export const Renderer = new RendererManager();
