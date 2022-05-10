import Input from "../../website/src/templates/input/Input.js";
export default class Canvas {
    constructor(htmlCanvas) {
        this.htmlCanvas =
            htmlCanvas == null ? document.createElement("canvas") : htmlCanvas;
        Input.newEventListener("resize", this, this.updateSize);
        this.updateSize();
    }
    updateSize() {
        this.htmlCanvas.width = this.htmlCanvas.getBoundingClientRect().width;
        this.htmlCanvas.height = this.htmlCanvas.getBoundingClientRect().height;
        this.width = this.htmlCanvas.width;
        this.heigh = this.htmlCanvas.height;
    }
}
