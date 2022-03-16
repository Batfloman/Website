import Canvas from "../display/Canvas.js";

export default class SceneObject {
  /** @type {Canvas} */
  canvas;

  init(canvas) {
    this.canvas = canvas;
  }

  update() {};
  render() {};

  notify(event) {
    console.log(event);
  }
}