"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Universe = void 0;
const Game_js_1 = require("../../../lib/games/Game.js");
const Color_js_1 = require("../../../lib/util/Color.js");
class Universe extends Game_js_1.Game {
    constructor(canvas) {
        super(canvas);
        this.gConst = 10;
        this.setWorldBackground(Color_js_1.Color.get("black"));
    }
    setGConst(gConst) {
        this.gConst = gConst;
    }
    getGConst() {
        return this.gConst;
    }
}
exports.Universe = Universe;
