import { GameObject } from "../objects/GameObject.js";
import { System } from "./System.js";
export declare class Game extends System {
    private gameObjects;
    private scene;
    private camera;
    private renderer;
    constructor(canvas: HTMLCanvasElement, useThree?: boolean);
    loop(dt: number): void;
    object: {
        add: (obj: GameObject) => void;
        remove: (obj: GameObject) => void;
    };
}
