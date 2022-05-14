import { Game } from "../../../lib/games/Game.js";
export default class Universe extends Game {
    constructor() {
        super(...arguments);
        this.gConst = 10;
    }
    tick() {
        super.tick();
    }
    setGConst(gConst) {
        this.gConst = gConst;
    }
    getGConst() {
        return this.gConst;
    }
}
