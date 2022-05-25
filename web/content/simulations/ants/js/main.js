import Game from "../../../lib/games/Game.js";
import Canvas from "../../../lib/display/Canvas.js";
import Util from "../../../lib/util/Util.js";
import Vector2 from "../../../lib/util/Vector2.js";
import AntHill from "./assets/AntHill.js";
import Food from "./assets/Food.js";
import { Color } from "../../../lib/util/Color.js";
const boardSize = 5000;
window.onload = () => {
    var _a;
    const canvas = new Canvas(document.querySelector("canvas"));
    const game = new Game(canvas);
    let arr = [[1, 2, 3], [3, 4, 5]];
    console.log(Util.array.connectArray(arr));
    game.setWorldBackground("main", new Color(45, 45, 45));
    (_a = game.getWorld()) === null || _a === void 0 ? void 0 : _a.setChunkSize(33);
    game.setCamaraMovementLock(false);
    game.setCamaraScaleLock(false);
    game.getCamara().setMaxZoomInAmount(0);
    game.getCamara().setMaxZoomOutAmount(8);
    game.setMaxUpdateDistance(3333);
    game.addObject(new AntHill(new Vector2(), 3000));
    for (let i = 0; i < 50; i++) {
        game.addObject(randomFood());
    }
    setInterval(() => {
        game.addObject(randomFood());
    }, 20000);
    game.start();
};
function randomPosition() {
    return new Vector2(Util.math.randomBetween(0, boardSize / 2, 2) * Util.math.postiveOrNegative(), Util.math.randomBetween(0, boardSize / 2, 2) * Util.math.postiveOrNegative());
}
function randomFood() {
    const pos = randomPosition();
    const amount = Util.math.randomBetween(7500, 20000);
    return new Food(pos, amount);
}
function randomAntHill() {
    const pos = randomPosition();
    const food = 1000;
    return new AntHill(pos, food);
}