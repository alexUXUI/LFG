export function createCanvas() {
  var canvas = document.createElement("canvas");
  canvas.setAttribute("id", "canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.zIndex = 0;
  document.body.appendChild(canvas);

  return canvas;
}

export const canvas = createCanvas();

// create the canvas ctx
export function createCanvasContext() {
  const _canvas = document.getElementById("canvas");
  const ctx = _canvas.getContext("2d");
  return ctx;
}

export const ctx = createCanvasContext();
