import { System } from "./System";
export class Game extends System {
    gameObjects = [];
    htmlCanvas;
    constructor(canvas) {
        this.canvas = canvas;
    }
}
