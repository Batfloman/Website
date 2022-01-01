export default class SceneElement {
    
    game;
    canvas;

    init(game) {
        this.game = game;
        this.canvas = game.getCanvas();
    }

    update(dt) { return;}
    render() { return;}
}