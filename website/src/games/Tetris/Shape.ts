import GameObject from "../../../../lib/gameAssets/GameObject.js.js";

export default class Shape extends GameObject {
    x;
    y;

    blocks;

    timePassed = 0;
    
    constructor(blocks, x, y) {
        super();

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
        if(this.timePassed > 100) {
            this.blocks.forEach(block => block.moveDown());
            this.timePassed = 0;
        }
    }
}