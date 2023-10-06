"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const GridWorld_js_1 = require("../../../lib/assets/worlds/GridWorld.js");
const Color_js_1 = require("../../../lib/util/Color.js");
const Input_js_1 = require("../../../lib/input/Input.js");
class Board extends GridWorld_js_1.GridWorld {
    constructor(canvas, xSize, ySize) {
        super(canvas.width, canvas.height, xSize, ySize);
        this.canvas = canvas;
        Input_js_1.Input.newEventListener("resize", this, () => {
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this.cellWidth = this.width / this.xSize;
            this.cellHeight = this.height / this.ySize;
        });
    }
    render(renderer) {
        renderer.setStrokeColor(Color_js_1.Color.get("black"));
        super.render(renderer);
    }
}
exports.Board = Board;
