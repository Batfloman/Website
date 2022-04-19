export default class GameObject {
    constructor() {
        this.pos = {
            x: null,
            y: null,
        };
    }
    init(game) { this.game = game; }
    ;
    update(dt) { return; }
    ;
    render() { return; }
    ;
    getPos() {
        return this.position;
    }
}
