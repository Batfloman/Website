export class SceneObject {
    constructor() {
        this.zIndex = 0;
    }
    init(game, canvas) {
        this.game = game;
        this.canvas = canvas;
    }
    shouldRender() {
        return true;
    }
    calc_valueChangeForDT(perSecond, dt) {
        return perSecond * dt / 1000;
    }
}
