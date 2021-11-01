import Game from "./game/Game.js";
import Options from "./game/Options.js";


var game = new Game();

window.onfocus = game.continue;
window.onblur = game.pause;
window.onresize = resizeCanvas;

window.onload = function() {
    resizeCanvas();
    game.start(3);
}

function resizeCanvas() {
    let canvas = document.getElementById('game-screen');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    Options.canvasWidth = canvas.width / 2;
    Options.canvasHeight = canvas.height / 2;

    game.renderObjects();
}