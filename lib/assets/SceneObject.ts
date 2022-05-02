import Canvas from "../display/Canvas.js";
import Game from "../games/Game.js";

export abstract class SceneObject {
  game!: Game;
  canvas!: Canvas;

  init(game: Game, canvas: Canvas) {
    this.game = game;
    this.canvas = canvas;
  }

  update(dt: number): void {};
  render(): void {};
}