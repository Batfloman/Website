import System from "../System.js";
import { IRenderable } from "../2d/propertys/IRenderable.js";
import { IUpdateable } from "../2d/propertys/IUpdateable.js";
import Camara from "../display/Camara.js";

export abstract class SceneObject implements IRenderable, IUpdateable {
  system!: System;

  zIndex: number = 0;

  init(system: System) {
    this.system = system;
  }

  abstract update(dt: number): void;
  abstract render(ctx: CanvasRenderingContext2D): void;
  abstract shouldRender(): boolean;

  getCamara(): Camara {
    return this.system.activeScene == undefined ? new Camara(this.system.canvas) : this.system.activeScene.camara;
  }
}