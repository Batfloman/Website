import { Game } from "../../../lib/games/Game.js";
import { Canvas } from "../../../lib/display/Canvas.js";
import { Util } from "../../../lib/util/Util.js";
import { Vector2 } from "../../../lib/util/Vector2.js";
import { Hive } from "./assets/Hive.js";
import { Food } from "./assets/Food.js";
import { Color } from "../../../lib/util/Color.js";
const boardSize = 5000;
window.onload = () => {
    var _a;
    const canvas = new Canvas(document.querySelector("canvas"));
    const game = new Game(canvas);
    game.setWorldBackground(new Color(45, 45, 45));
    (_a = game.getWorld()) === null || _a === void 0 ? void 0 : _a.setChunkSize(33);
    game.setCamaraMovementLock(false);
    game.setCamaraScaleLock(false);
    game.getCamara().setMaxZoomInAmount(10);
    game.getCamara().setMaxZoomOutAmount(8);
    game.addObject(new Hive(new Vector2(), 10000));
    for (let i = 0; i < 75; i++) {
        game.addObject(randomFood());
    }
    setInterval(() => {
        game.addObject(randomFood());
    }, 5000);
    game.start();
};
function randomPosition() {
    return new Vector2(Util.math.random.between(0, boardSize / 2, 2) * Util.math.random.mathSign(), Util.math.random.between(0, boardSize / 2, 2) * Util.math.random.mathSign());
}
function randomFood() {
    const pos = randomPosition();
    const amount = Util.math.random.between(2500, 10000);
    return new Food(pos, amount);
}
function randomAntHill() {
    const pos = randomPosition();
    const food = 1500;
    return new Hive(pos, food);
}
