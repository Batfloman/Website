import { Input } from "../input/Input.js";
export class Canvas {
    htmlCanvas;
    width = 0;
    height = 0;
    constructor(htmlCanvas) {
        this.htmlCanvas = htmlCanvas == null ? document.createElement("canvas") : htmlCanvas;
        Input.newEventListener("resize", this, this.updateSize);
        this.updateSize();
    }
    updateSize() {
        this.htmlCanvas.width = this.htmlCanvas.getBoundingClientRect().width;
        this.htmlCanvas.height = this.htmlCanvas.getBoundingClientRect().height;
        this.width = this.htmlCanvas.getBoundingClientRect().width;
        this.height = this.htmlCanvas.getBoundingClientRect().height;
    }
}
