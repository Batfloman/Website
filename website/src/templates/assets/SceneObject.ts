import Canvas from "../display/Canvas.js";
import System from "../System.js";
import { IRenderable } from "../propertys/IRenderable.js";
import { IUpdateable } from "../propertys/IUpdateable.js";

export abstract class SceneObject implements IRenderable, IUpdateable {
  canvas!: Canvas;
  system!: System;

  zIndex: number = 0;

  init(canvas: Canvas, system: System) {
    this.canvas = canvas;
    this.system = system;
  }

  abstract update(dt: number): void;
  abstract render(ctx: CanvasRenderingContext2D): void;
  abstract shouldRender(): boolean;
}