"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Game_js_1 = require("../../../lib/games/Game.js");
const Canvas_js_1 = require("../../../lib/display/Canvas.js");
const Util_js_1 = require("../../../lib/util/Util.js");
const Vector2_js_1 = require("../../../lib/util/Vector2.js");
const Hive_js_1 = require("./assets/Hive.js");
const Food_js_1 = require("./assets/Food.js");
const Color_js_1 = require("../../../lib/util/Color.js");
const boardSize = 5000;
window.onload = () => {
    var _a;
    const canvas = new Canvas_js_1.Canvas(document.querySelector("canvas"));
    const game = new Game_js_1.Game(canvas);
    // settings
    game.setWorldBackground(new Color_js_1.Color(45, 45, 45));
    (_a = game.getWorld()) === null || _a === void 0 ? void 0 : _a.setChunkSize(33);
    game.setCamaraMovementLock(false);
    // Bug when zooming in => frames go DED
    game.setCamaraScaleLock(false);
    game.getCamara().setMaxZoomInAmount(10);
    game.getCamara().setMaxZoomOutAmount(8);
    game.addObject(new Hive_js_1.Hive(new Vector2_js_1.Vector2(), 10000));
    for (let i = 0; i < 75; i++) {
        game.addObject(randomFood());
    }
    setInterval(() => {
        game.addObject(randomFood());
    }, 5000);
    game.start();
};
function randomPosition() {
    return new Vector2_js_1.Vector2(Util_js_1.Util.math.random.between(0, boardSize / 2, 2) * Util_js_1.Util.math.random.mathSign(), Util_js_1.Util.math.random.between(0, boardSize / 2, 2) * Util_js_1.Util.math.random.mathSign());
}
function randomFood() {
    const pos = randomPosition();
    const amount = Util_js_1.Util.math.random.between(2500, 10000);
    return new Food_js_1.Food(pos, amount);
}
function randomAntHill() {
    const pos = randomPosition();
    const food = 1500;
    return new Hive_js_1.Hive(pos, food);
}
