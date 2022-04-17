import Rocket from "./gameAssets/Rocket.js";
var interval;
var canvas;
var lastTime;
var rocket;
window.onload = function () {
    resize();
    canvas = document.getElementById("game-screen");
    ['mousedown', 'touchstart'].forEach(event => canvas.addEventListener(event, function () { rocket.setThruster(true); }, false));
    ['mouseup', 'touchend', 'touchcancel'].forEach(event => canvas.addEventListener(event, function () { rocket.setThruster(false); }, false));
    canvas.oncontextmenu = event => { event.preventDefault(); event.stopPropagation(); };
    start();
};
function start() {
    rocket = new Rocket();
    lastTime = Date.now();
    rocket.init(canvas);
    interval = setInterval(gameTick, 5);
}
function stop() { clearInterval(interval); }
function gameTick() {
    let dt = Date.now() - lastTime;
    lastTime = Date.now();
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = canvas.height / 10;
    ctx.strokeStyle = "green";
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.stroke();
    if (rocket.height <= 0) {
        if (rocket.fallSpeed > 7.5)
            rocket.symbol = "💥";
        rocket.render();
        stop();
        setTimeout(start, 2000);
    }
    else {
        rocket.update(dt);
        rocket.render();
    }
}
