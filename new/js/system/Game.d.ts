import { GameObject } from "../objects/GameObject.js";
import { System } from "./System.js";
export declare class Game extends System {
    private gameObjects;
    private renderer;
    private camera;
    private scene;
    constructor(canvas: HTMLCanvasElement);
    loop(dt: number): void;
    object: {
        add: (obj: GameObject) => void;
        remove: (obj: GameObject) => void;
    };
}
