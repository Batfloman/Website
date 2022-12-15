import { System } from "./System";

export class Game extends System {
  gameObjects: GameObject[] = [];
  htmlCanvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }
}