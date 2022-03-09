export default class GameObject {
    game;

    pos = {
        x: null,
        y: null,
    }

    init(game) {this.game = game};
    update(dt) {return;};
    render() {return;};

    getPos() {
        return this.position;
    }
}