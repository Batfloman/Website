"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.System = void 0;
const Game_js_1 = require("../../../../../lib/games/Game.js");
const Color_js_1 = require("../../../../../lib/util/Color.js");
class System extends Game_js_1.Game {
    constructor(canvas) {
        super(canvas);
        this.speedMult = 1;
        this.setWorldBackground(Color_js_1.Color.get("red"));
    }
}
exports.System = System;
