import { Game } from "../../../lib/games/Game.js";
import { Canvas } from "../../../lib/display/Canvas.js";
import { Util } from "../../../lib/util/Util.js";
import { Vector2 } from "../../../lib/util/Vector2.js";
import { Hive } from "./assets/Hive.js";
import { Food } from "./assets/Food.js";
import { Color } from "../../../lib/util/Color.js";
import { Ant } from "./assets/Ant.js";
import { UISimpleButton } from "../../../lib/assets/objects/ui/UISimpleButton.js";

const boardSize = 5000;

window.onload = () => {
  const canvas = new Canvas(document.querySelector("canvas"));
  const game = new Game(canvas);

  // settings
  game.setWorldBackground(new Color(45, 45, 45));
  game.getWorld()?.setChunkSize(33);
  game.setCamaraMovementLock(false);
  // Bug when zooming in => frames go DED
  game.setCamaraScaleLock(false);
  game.getCamara().setMaxZoomInAmount(10);
  game.getCamara().setMaxZoomOutAmount(8);

  // ==========================================================================================
  // #region buttons

  const killAnts = new UISimpleButton(new Vector2(7, 5), "10", "5", "kill All Ants");
  killAnts.action = () => {
    const ants = game.findObjects<Ant>(Ant);
    for(let ant of ants) {
      game.removeObject(ant);
    }
  }
  game.addObject(killAnts);

  //#endregion

  game.addObject(new Hive(new Vector2(), 10000));

  for (let i = 0; i < 75; i++) {
    game.addObject(randomFood());
  }

  setInterval(() => {
    game.addObject(randomFood());
  }, 5000);

  game.start();
};

function randomPosition(): Vector2 {
  return new Vector2(
    Util.math.random.between(0, boardSize / 2, 2) * Util.math.random.mathSign(),
    Util.math.random.between(0, boardSize / 2, 2) * Util.math.random.mathSign()
  );
}

function randomFood(): Food {
  const pos = randomPosition();
  const amount = Util.math.random.between(2500, 10000);
  return new Food(pos, amount);
}

function randomAntHill(): Hive {
  const pos = randomPosition();
  const food = 1500;
  return new Hive(pos, food);
}
