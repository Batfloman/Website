import Canvas from "../display/Canvas.js";
import System from "../System.js";

export default class SceneObject {
  canvas!: Canvas;
  system!: System;

  zIndex:number = 0;

  init(canvas: Canvas, system: System) {
    this.canvas = canvas;
    this.system = system;
  }

  update(dt: number) {};
  render(ctx: CanvasRenderingContext2D) {};

  notify(event: Event) {
    console.log(event);
  }
}