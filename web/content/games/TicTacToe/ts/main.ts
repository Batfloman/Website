import Canvas from "../../../lib/display/Canvas.js";
import Vector2 from "../../../lib/util/Vector2.js";
import TicTacToeGame from "./assets/TicTacToeGame.js"
import TicTacToePlayer from "./assets/TicTacToePlayer.js";

window.onload = () => {
  const canvas = new Canvas(document.querySelector("canvas"));
  const game = new TicTacToeGame(canvas);

  game.setCamaraScaleLock(false);
  game.setCamaraMovementLock(false);

  // const player1 = new TicTacToePlayer();
  // game.addPlayer(player1);

  // const player2 = new TicTacToePlayer(); 
  // game.addPlayer(player2);

  game.randomPlayerTurn();

  game.tick();
  // game.start();
}