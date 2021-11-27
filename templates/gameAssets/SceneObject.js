import Game from "../Game.js";

export default class SceneObject {
    /** @type {Game} */
    game;
    canvas;
    
    init(game) {
        this.game = game;
        this.canvas = game.getCanvas();
    }

    update(dt) { return;}
    render() { return;}
}