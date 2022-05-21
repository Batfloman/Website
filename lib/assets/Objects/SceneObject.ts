import Canvas from "../../display/Canvas.js";
import IRenderable from "../../display/IRenderable.js";
import Renderer from "../../display/Renderer.js";
import { Game } from "../games/Game.js";

export abstract class SceneObject implements IRenderable {
  game!: Game;
  canvas!: Canvas;
  zIndex: number = 0;

  init(game: Game, canvas: Canvas) {
    this.game = game;
    this.canvas = canvas;
  }

  abstract update(dt: number): void;
  abstract render(renderer: Renderer): void;

  abstract shouldUpdate(): boolean;
  abstract shouldRender(): boolean;

  calc_valueChangeForDT(perSecond: number, dt: number): number {
    let value = perSecond * dt / 1000;
    return Number.isNaN(value) ? 0 : value;
  }
}
