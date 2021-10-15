import Paddel from "./gameAssets/Paddle.js";

var lastTime;

var canvas;

var paddel;

window.onload = function() {
    canvas = document.getElementById('game-screen');
    resizeCanvas();
    paddel = new Paddel(canvas.width / 15, canvas.height / 2);
    paddel.init(canvas);
    canvas.addEventListener("mousemove", function(event) {paddel.setY(event.offsetY);});
    lastTime = Date.now();

    gameLoop();
}

window.onresize = resizeCanvas;

function resizeCanvas() {
    canvas.width = canvas.getBoundingClientRect().width;
    canvas.height = canvas.getBoundingClientRect().height;
}

function gameLoop() {
    let now = Date.now();
    let dt = now - lastTime;
    lastTime = now;

    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    paddel.render(ctx);
    
    window.requestAnimationFrame(gameLoop);
}