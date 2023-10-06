"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TetrisGrid = void 0;
const GridWorld_js_1 = require("../../../../lib/assets/worlds/GridWorld.js");
const Color_js_1 = require("../../../../lib/util/Color.js");
class TetrisGrid extends GridWorld_js_1.GridWorld {
    render(renderer) {
        renderer.setStrokeColor(Color_js_1.Color.get("white"));
        renderer.setLineWidth(1.5);
        super.render(renderer);
    }
}
exports.TetrisGrid = TetrisGrid;
