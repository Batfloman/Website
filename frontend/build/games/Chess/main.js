var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Vector2f from "./util/Vector2f.js";
import BoardLoader from "./loader/BoardLoader.js";
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
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        canvas = document.getElementById('game-screen');
        canvas.addEventListener('mousedown', event => registerClick(event.offsetX, event.offsetY));
        resizeCanvas();
        let boardBlueprint = yield BoardLoader.loadBoard("standard");
        board = boardBlueprint.board;
        players = boardBlueprint.player;
        pieces = boardBlueprint.pieces;
        gameLoop();
    });
}
function gameLoop() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!paused) {
            board.render(canvas);
            pieces.forEach(piece => {
                piece.render(canvas);
            });
            if (!!selected)
                selected.update();
        }
        window.requestAnimationFrame(gameLoop);
    });
}
function resizeCanvas() {
    if (!canvas)
        return;
    canvas.width = canvas.getBoundingClientRect().width;
    canvas.height = canvas.getBoundingClientRect().height;
    if (!!board)
        board.render(canvas);
}
function registerClick(x, y) {
    if (!board)
        return;
    let xCoord = Math.floor(x / canvas.width * board.x);
    let yCoord = board.y - 1 - Math.floor(y / canvas.height * board.y);
    let pos = new Vector2f(xCoord, yCoord);
    selected = null;
    pieces.forEach(piece => {
        if (piece.getPos().equals(pos)) {
            selected = piece;
        }
    });
}
