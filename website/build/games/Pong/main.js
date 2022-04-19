import Ball from "./gameAssets/Ball.js";
import Paddle from "./gameAssets/Paddle.js";
var player;
var ai;
var ball;
window.onload = () => {
    let canvas = document.getElementById("game-screen");
    player = new Paddle(canvas.width * 0.05, canvas.height / 2);
    ai = new Paddle(canvas.width * 0.95, canvas.height / 2, true);
    ball = new Ball(canvas.width / 2, canvas.height / 2);
};
function gameLoop() {
    console.log("loop");
    window.requestAnimationFrame(gameLoop);
}
