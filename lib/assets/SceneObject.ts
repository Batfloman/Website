import Canvas from "../display/Canvas.js";
import IRenderable from "../display/IRenderable.js";
import Renderer from "../display/Renderer.js";
import { Game } from "../games/Game.js";
import Vector2 from "../util/Vector2.js";

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
}
