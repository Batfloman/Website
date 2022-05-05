import Input from "../input/Input.js";

export default class Canvas {
  htmlCanvas: HTMLCanvasElement;

  width!: number;
  height!: number;

  constructor(htmlCanvas: HTMLCanvasElement | null) {
    this.htmlCanvas =
      htmlCanvas == null ? document.createElement("canvas") : htmlCanvas;

    Input.newEventListener("resize", this, this.updateSize);
    this.updateSize();
  }

  updateSize() {
    this.htmlCanvas.width = this.htmlCanvas.getBoundingClientRect().width;
    this.htmlCanvas.height = this.htmlCanvas.getBoundingClientRect().height;

    this.width = this.htmlCanvas.width;
    this.height = this.htmlCanvas.height;
  }
}
