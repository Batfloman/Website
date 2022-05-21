import Game from "../../../lib/assets/games/Game.js";
import Canvas from "../../../lib/display/Canvas.js";
import Ant from "./Ant.js";
import AntHill from "./AntHill.js";
window.onload = () => {
    const canvas = new Canvas(document.querySelector("canvas"));
    const game = new Game(canvas);
    game.setCamaraMovementLock(false);
    game.setCamaraScaleLock(false);
    for (let i = 0; i < 10000; i++) {
        game.addObject(new Ant());
    }
    game.addObject(new AntHill());
    game.start();
};
