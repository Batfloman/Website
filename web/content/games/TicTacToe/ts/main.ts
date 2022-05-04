import TurnBasedGame from "../../../lib/games/TurnBasedGame.js";
import Canvas from "../../../lib/display/Canvas.js";
import Player from "../../../lib/players/Player.js";

window.onload = () => {
  const canvas = new Canvas(document.querySelector("canvas"));
  const game = new TurnBasedGame(canvas);

  let player1 = new Player();
  game.addPlayer(player1);
  let player2 = new Player();
  game.addPlayer(player2);

  // let board = new Board();
  // game.addObject(board);

  game.randomPlayerTurn();

  game.start();
};
