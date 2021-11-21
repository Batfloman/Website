import Game from "../../../../templates/Game.js";
import GameBoard from "../../../../templates/gameAssets/GameBoard.js";
import TicTacToePlayer from "./actor/TicTacToePlayer.js";


window.onload = () => {
    let canvas = document.getElementById('game-screen');

    let game = new Game(canvas);

    game.addObject( new GameBoard(3, 3));
    game.addPlayer( new TicTacToePlayer("x"));

    game.start();
}