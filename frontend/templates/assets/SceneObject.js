import Canvas from "../display/Canvas.js";
import System from "../System.js";

export default class SceneObject {
  /** @type {Canvas} */
  canvas;
  /** @type {System} */
  system;
  /** @type {number} */
  zIndex = 0;

  init(canvas, system) {
    this.canvas = canvas;
    this.system = system;
  }

  update() {};
  render() {};

  notify(event) {
    console.log(event);
  }
}