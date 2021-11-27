import CanvasElement from "../../../../templates/CanvasElement.js";
import Game from "../../../../templates/Game.js";
import Color from "../../../chess/src/js/util/Color.js";
import Block from "./Block.js";
import Board from "./Board.js";
import Shape from "./Shape.js";

var canvas;
var game;

window.onload = () => {
    canvas = document.getElementById('game-screen');
    let canvasElement = new CanvasElement(canvas);

    game = new Game(canvasElement);

    game.addObject(new Board(9, 20));
    let blocks = [new Block(0, 10), new Block(8, 5), new Block(4, 19)]
    let shape = new Shape(blocks, 0, 0);
    game.addObject(shape);

    game.start();
}