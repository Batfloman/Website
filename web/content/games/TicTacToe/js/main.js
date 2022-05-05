import TicTacToePlayer from "./TicTacToePlayer.js";
import Canvas from "../../../lib/display/Canvas.js";
import Game from "./Game.js";
import Board from "./Borad.js";
import Vector2 from "../../../lib/util/Vector2.js";
window.onload = () => {
    const canvas = new Canvas(document.querySelector("canvas"));
    const game = new Game(canvas);
    let player1 = new TicTacToePlayer();
    game.addPlayer(player1);
    let player2 = new TicTacToePlayer();
    game.addPlayer(player2);
    let board = new Board(new Vector2(), 3, 3);
    game.addObject(board);
    game.randomPlayerTurn();
    game.start();
    // game.tick();
};
