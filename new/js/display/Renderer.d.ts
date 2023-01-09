import { Camera } from "./Camera.js";
import { Scene } from "./Scene.js";
export declare class Renderer {
    domElement: HTMLCanvasElement;
    constructor(canvas: HTMLCanvasElement);
    render(scene: Scene, camera: Camera): void;
}
