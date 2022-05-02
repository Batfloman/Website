import Canvas from "./Canvas";

export default class Renderer {
  canvas: Canvas;
  
  constructor(canvas: Canvas) {
    this.canvas = canvas;
  }
}