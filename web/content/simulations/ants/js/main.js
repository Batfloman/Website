import Game from "../../../lib/games/Game.js";
import Canvas from "../../../lib/display/Canvas.js";
import Util from "../../../lib/util/Util.js";
import Vector2 from "../../../lib/util/Vector2.js";
import AntHill from "./assets/AntHill.js";
import Food from "./assets/Food.js";
import { Color } from "../../../lib/util/Color.js";
import Ant from "./assets/Ant.js";
import Pheromon from "./assets/Pheromon.js";
window.onload = () => {
    const canvas = new Canvas(document.querySelector("canvas"));
    const game = new Game(canvas);
    game.setWorldBackground("main", new Color(45, 45, 45));
    game.setCamaraMovementLock(false);
    game.setCamaraScaleLock(false);
    game.getCamara().setMaxZoomInAmount(0);
    game.addObject(new Ant());
    game.addObject(new Pheromon(new Vector2(10, 30), "food"));
    game.addObject(new Pheromon(new Vector2(20, 60), "food"));
    game.addObject(new Pheromon(new Vector2(30, 90), "food"));
    game.addObject(new Pheromon(new Vector2(40, 120), "food"));
    game.addObject(new Pheromon(new Vector2(50, 150), "food"));
    game.start();
    return;
    game.addObject(new AntHill(new Vector2(), 0));
    const amountAnts = 50;
    let counter = 0;
    let interval;
    interval = setInterval(() => {
        if (++counter >= amountAnts)
            clearInterval(interval);
        game.addObject(new Ant());
    }, 150);
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
