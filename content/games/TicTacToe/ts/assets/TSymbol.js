"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TSymbol = void 0;
const GridCell_js_1 = require("../../../../lib/assets/objects/GridCell.js");
const Color_js_1 = require("../../../../lib/util/Color.js");
const Vector2_js_1 = require("../../../../lib/util/Vector2.js");
class TSymbol extends GridCell_js_1.GridCell {
    constructor(symbol, grid, gridPos) {
        super(grid, gridPos);
        this.symbol = symbol;
    }
    update(dt) { }
    render(renderer) {
        renderer.setFillColor(Color_js_1.Color.none);
        renderer.setLineWidth(10);
        switch (this.symbol) {
            case "x":
                const w = this.grid.cellWidth / 4;
                const h = this.grid.cellHeight / 4;
                const start1 = this.pos.subtract(new Vector2_js_1.Vector2(w, h));
                const end1 = this.pos.subtract(new Vector2_js_1.Vector2(-w, -h));
                renderer.renderLine(start1, end1);
                const start2 = this.pos.subtract(new Vector2_js_1.Vector2(-w, h));
                const end2 = this.pos.subtract(new Vector2_js_1.Vector2(w, -h));
                renderer.renderLine(start2, end2);
                break;
            case "o":
                renderer.renderEllipse(this.pos, this.grid.cellWidth / 4, this.grid.cellHeight / 4);
                break;
            default:
                console.warn("no symbol render defined!");
        }
    }
}
exports.TSymbol = TSymbol;
