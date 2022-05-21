import { Game } from "../../../lib/assets/games/Game.js";

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