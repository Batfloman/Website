import GameObject from "../../../../templates/gameAssets/GameObject.js";
export default class Shape extends GameObject {
    constructor(blocks, x, y) {
        super();
        this.timePassed = 0;
        this.blocks = blocks;
    }
    init(game) {
        super.init(game);
        this.blocks.forEach(block => block.init(this.game));
    }
    render() {
        this.blocks.forEach(block => block.render());
    }
    update(dt) {
        this.timePassed += dt;
        if (this.timePassed > 100) {
            this.blocks.forEach(block => block.moveDown());
            this.timePassed = 0;
        }
    }
}
