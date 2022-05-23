import Game from "../../../lib/games/Game.js";
import Canvas from "../../../lib/display/Canvas.js";
import Util from "../../../lib/util/Util.js";
import Vector2 from "../../../lib/util/Vector2.js";
import AntHill from "./assets/AntHill.js";
import Food from "./assets/Food.js";
import { Color } from "../../../lib/util/Color.js";
import Ant from "./assets/Ant.js";

window.onload = () => {
  const canvas = new Canvas(document.querySelector("canvas"));
  const game = new Game(canvas);

  game.setWorldBackground("main", new Color(45, 45, 45));

  game.setCamaraMovementLock(false);
  // Bug when zooming in => frames go DED
  // game.setCamaraScaleLock(false);

  game.addObject(new AntHill(new Vector2(), 0));

  for (let i = 0; i < 100; i++) {
    game.addObject(new Ant());
  }

  game.addObject(randomFood());
  game.addObject(randomFood());

  setInterval(() => {
    game.addObject(randomFood())
  }, 15000);

  game.start();
};

function randomFood(): Food {
  const pos = new Vector2(
    Util.math.randomBetween(100, 400, 2) * Util.math.postiveOrNegative(),
    Util.math.randomBetween(100, 400, 2) * Util.math.postiveOrNegative()
  )
  const amount = Util.math.randomBetween(7500, 20000);
  return new Food(pos, amount)
}