"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Canvas = void 0;
const Input_js_1 = require("../input/Input.js");
class Canvas {
    constructor(htmlCanvas) {
        this.width = 0;
        this.height = 0;
        this.htmlCanvas = htmlCanvas == null ? document.createElement("canvas") : htmlCanvas;
        Input_js_1.Input.newEventListener("resize", this, this.updateSize);
        this.updateSize();
    }
    updateSize() {
        this.htmlCanvas.width = this.htmlCanvas.getBoundingClientRect().width;
        this.htmlCanvas.height = this.htmlCanvas.getBoundingClientRect().height;
        this.width = this.htmlCanvas.getBoundingClientRect().width;
        this.height = this.htmlCanvas.getBoundingClientRect().height;
    }
}
exports.Canvas = Canvas;
