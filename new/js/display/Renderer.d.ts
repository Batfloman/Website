import { Scene } from "./Scene.js";
import { Camera } from "./Camera.js";
export declare class Renderer {
    domElement: HTMLCanvasElement;
    constructor(canvas: HTMLCanvasElement);
    render(scene: Scene, camera: Camera): void;
    setSize(width: number, height: number): any;
}
