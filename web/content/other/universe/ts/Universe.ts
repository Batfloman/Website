import Game from "../../../lib/games/Game.js";

export default class Universe extends Game {
  gConst: number = 10;

  setGConst(gConst: number) {
    this.gConst = gConst;
  }

  getGConst() {
    return this.gConst;
  }
}