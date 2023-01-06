import { Camera } from "./Camera.js";
import { Scene } from "./Scene.js";

export class Renderer {
  domElement: HTMLCanvasElement;
  constructor(canvas: HTMLCanvasElement) {
    this.domElement = canvas;
  }
  render(scene: Scene, camera: Camera) {
    scene.meshes.forEach((mesh) => {});
  }
}
