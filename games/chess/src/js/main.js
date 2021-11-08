import Vector2f from "./util/Vector2f.js";
import BoardLoader from "./loader/BoardLoader.js";
import ImageLoader from "./loader/ImageLoader.js";

window.onload = start;
window.onblur = () => paused = true;
window.onfocus = () => paused = false;
window.addEventListener('resize', resizeCanvas);

var paused = false;

var canvas;
var board;
var pieces;
var players;

var selected;

async function start() {
    canvas = document.getElementById('game-screen');
    canvas.addEventListener('mousedown', event => registerClick(event.offsetX, event.offsetY));
    resizeCanvas();

    let boardBlueprint = await BoardLoader.loadBoard("standard");

    board = boardBlueprint.board;
    players = boardBlueprint.player;
    pieces = boardBlueprint.pieces;

    gameLoop();
}

async function gameLoop() {
    if(!paused) {
        board.render(canvas);
        pieces.forEach(piece => {
            piece.render(canvas);
        });
        if(!!selected) selected.update();
    }

    window.requestAnimationFrame(gameLoop);
}

function resizeCanvas() {
    if(!canvas) return;
    
    canvas.width = canvas.getBoundingClientRect().width;
    canvas.height = canvas.getBoundingClientRect().height;

    if(!!board) board.render(canvas);
}

function registerClick(x, y) {
    if(!board) return;

    let xCoord = Math.floor(x / canvas.width * board.x);
    let yCoord = board.y - 1 - Math.floor(y / canvas.height * board.y);
    let pos = new Vector2f(xCoord, yCoord);
    
    selected = null;
    pieces.forEach(piece => {
        if(piece.getPos().equals(pos)) selected = piece;
    });
}