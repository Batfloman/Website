import Game from "../../../lib/assets/games/Game.js";
import Canvas from "../../../lib/display/Canvas.js";
import Util from "../../../lib/util/Util.js";
import Vector2 from "../../../lib/util/Vector2.js";
import AntHill from "./AntHill.js";
import Food from "./Food.js";
window.onload = () => {
    const canvas = new Canvas(document.querySelector("canvas"));
    const game = new Game(canvas);
    game.setCamaraMovementLock(false);
    game.setCamaraScaleLock(false);
    game.addObject(new AntHill(new Vector2(), 10000));
    game.addObject(randomFood());
    game.addObject(randomFood());
    setInterval(() => {
        game.addObject(randomFood());
    }, 15000);
    game.start();
};
function randomFood() {
    const pos = new Vector2(Util.math.randomBetween(100, 400, 2) * Util.math.postiveOrNegative(), Util.math.randomBetween(100, 400, 2) * Util.math.postiveOrNegative());
    const amount = Util.math.randomBetween(7500, 20000);
    return new Food(pos, amount);
}
