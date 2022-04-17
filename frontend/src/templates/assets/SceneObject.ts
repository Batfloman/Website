import Canvas from "../display/Canvas";
import System from "../System";

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