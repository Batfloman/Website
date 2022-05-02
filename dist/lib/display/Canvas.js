import Input from "../../website/src/templates/input/Input";
export default class Canvas {
    constructor(htmlCanvas) {
        this.htmlCanvas = htmlCanvas;
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
