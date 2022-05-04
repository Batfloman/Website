import Canvas from "../display/Canvas.js";
import IRenderable from "../display/IRenderable.js";
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
  abstract render(ctx: CanvasRenderingContext2D): void;
}
