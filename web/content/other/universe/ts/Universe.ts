import { Game } from "../../../lib/games/Game.js";
import { Color } from "../../../lib/util/Color.js";
import Util from "../../../lib/util/Util.js";
import Vector2 from "../../../lib/util/Vector2.js";
import SkyBody from "./SkyBody.js";

export default class Universe extends Game {
  gConst: number = 10;

  tick() {
    super.tick();
  }

  setGConst(gConst: number) {
    this.gConst = gConst;
  }

  getGConst() {
    return this.gConst;
  }
}