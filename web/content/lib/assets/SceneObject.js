export class SceneObject {
    constructor() {
        this.zIndex = 0;
    }
    init(game, canvas) {
        this.game = game;
        this.canvas = canvas;
    }
}
