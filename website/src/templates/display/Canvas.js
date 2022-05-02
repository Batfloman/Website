"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Input_js_1 = __importDefault(require("../input/Input.js"));
class Canvas {
    constructor(htmlCanvas) {
        if (htmlCanvas == null)
            htmlCanvas = document.createElement("canvas");
        this.htmlCanvas = htmlCanvas;
        Input_js_1.default.newEventListener("resize", this, this.updateSizeValues);
        this.updateSizeValues();
    }
    render(scene) {
        if (!scene)
            return;
        let ctx = this.htmlCanvas.getContext("2d");
        if (!!ctx) {
            ctx.clearRect(0, 0, this.htmlCanvas.width, this.htmlCanvas.height);
            scene.render(ctx);
        }
    }
    updateSizeValues() {
        this.htmlCanvas.width = this.htmlCanvas.getBoundingClientRect().width;
        this.htmlCanvas.height = this.htmlCanvas.getBoundingClientRect().height;
    }
}
exports.default = Canvas;
