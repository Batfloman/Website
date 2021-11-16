export default class SceneObject {
    game;
    canvas;

    init(game) {
        this.game = game;
        this.canvas = game.canvasElement.canvas;
    }

    update(dt) {return;}
    
    render() {return;}
}