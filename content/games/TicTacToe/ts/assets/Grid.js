"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = void 0;
const GridWorld_js_1 = require("../../../../lib/assets/worlds/GridWorld.js");
const Color_js_1 = require("../../../../lib/util/Color.js");
const Input_js_1 = require("../../../../lib/input/Input.js");
const TSymbol_js_1 = require("./TSymbol.js");
class Grid extends GridWorld_js_1.GridWorld {
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
    clicked(worldPos) {
        const cell = this.findGridPosition(worldPos);
        if (this.grid.isCellEmpty(cell.x, cell.y)) {
            this.addCell(new TSymbol_js_1.TSymbol("x", this, cell));
        }
    }
    render(renderer) {
        renderer.setStrokeColor(Color_js_1.Color.get("black"));
        renderer.setLineWidth(5);
        super.render(renderer);
    }
}
exports.Grid = Grid;
