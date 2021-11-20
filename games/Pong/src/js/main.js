import CanvasElement from "../../../../templates/CanvasElement.js";
import Game from "../../../../templates/Game.js";
import Input from "../../../../templates/input/Input.js";
import Ball from "./gameAssets/Ball.js";
import Paddle from "./gameAssets/Paddle.js";

window.onload = () => {
    let canvas = document.getElementById("game-screen");
    var game = new Game(canvas);

    game.addObject( new Paddle(canvas.width * 0.05, canvas.height/2));
    game.addObject( new Paddle(canvas.width * 0.95, canvas.height/2, true));
    game.addObject( new Ball(canvas.width/2, canvas.height/2));

    game.start();
}