"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
const GridCell_js_1 = require("../../../../lib/assets/objects/GridCell.js");
const Color_js_1 = require("../../../../lib/util/Color.js");
class Block extends GridCell_js_1.GridCell {
    constructor() {
        super(...arguments);
        this.color = Color_js_1.Color.get("white");
    }
    update2(dt) { }
    render(renderer) {
        renderer.setStrokeColor(Color_js_1.Color.none);
        renderer.setFillColor(this.color);
        renderer.renderRectangle(this.getWorldPos(), this.grid.cellWidth, this.grid.cellHeight);
        renderer.setFillColor(new Color_js_1.Color(255, 255, 255, 50));
        renderer.renderRectangle(this.getWorldPos(), this.grid.cellWidth / 2, this.grid.cellHeight / 2);
    }
}
exports.Block = Block;
