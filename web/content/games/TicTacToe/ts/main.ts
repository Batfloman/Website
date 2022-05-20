import Canvas from "../../../lib/display/Canvas.js";
import Vector2 from "../../../lib/util/Vector2.js";
import Board from "./Board.js";
import Cell from "./Cell.js";
import TicTacToeGame from "./TicTacToeGame.js"
import TicTacToePlayer from "./TicTacToePlayer.js";

window.onload = () => {

  const canvas = new Canvas(document.querySelector("canvas"));
  const game = new TicTacToeGame(canvas);

  game.setCamaraScaleLock(false);
  game.setCamaraMovementLock(false);

  const board = new Board(
    new Vector2(),
    canvas.width,
    canvas.height,
    3,
    3
  )

  game.addObject(board);

  // const player1 = new TicTacToePlayer();
  // game.addPlayer(player1);

  // const player2 = new TicTacToePlayer(); 
  // game.addPlayer(player2);

  game.randomPlayerTurn();

  // game.tick();
  game.start();
}