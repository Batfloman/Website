import Canvas from "../../../lib/display/Canvas.js";
import Vector2 from "../../../lib/util/Vector2.js";
import Board from "./Board.js";
import Cell from "./Cell.js";
import TicTacToeGame from "./TicTacToeGame.js"
import TicTacToePlayer from "./TicTacToePlayer.js";

window.onload = () => {

  const canvas = new Canvas(document.querySelector("canvas"));
  const game = new TicTacToeGame(canvas);

  const board = new Board(
    new Vector2(),
    canvas.width,
    canvas.height,
    3,
    3
  )

  board.setCell(0, 0, new Cell(board));
  board.setCell(0, 1, new Cell(board));
  board.setCell(0, 2, new Cell(board));
  board.setCell(1, 0, new Cell(board));
  board.setCell(1, 1, new Cell(board));
  board.setCell(1, 2, new Cell(board));
  board.setCell(2, 0, new Cell(board));
  board.setCell(2, 1, new Cell(board));
  board.setCell(2, 2, new Cell(board));

  game.addObject(board);

  // const player1 = new TicTacToePlayer();
  // game.addPlayer(player1);

  // const player2 = new TicTacToePlayer(); 
  // game.addPlayer(player2);

  game.randomPlayerTurn();

  game.tick();
}