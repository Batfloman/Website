export class SceneObject {
    game;
    canvas;
    camara;
    zIndex = 0;
    init(game, canvas) {
        this.game = game;
        this.camara = game.getCamara();
        this.canvas = canvas;
    }
}
