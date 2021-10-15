import Color from "../util/Color.js";
import Block from "./Block.js";
import Field from "./Field.js";

export default class Shape {
    blocks = new Array();
    placed;

    constructor(shape) {
        let offSet = {
            x: Math.floor(Field.instance.dimension.x / 2)    ,
            y: 2
        }
        shape.tiles.forEach(position => {
            let relPos = position;
            relPos.x += offSet.x;
            relPos.y += offSet.y;
            this.blocks.push( new Block(relPos, Color.convertRGBToColor(shape.style.color)))
        });

        this.addToField();
    }

    init(canvas) { this.blocks.forEach(block => block.init(canvas));}

    rotate() {

    }

    moveDown() {
        this.removeFromField();
        if(this.testMove(0, 1)) {
            this.blocks.forEach(block => block.move(0, 1));
        } else {
            this.placed = true;
        }
        this.addToField();
    }

    setX(x) {

    }

    /**
     * @param {number} x
     * @param {number} y
     */
    testMove(x, y) {
        let possible = true;
        this.blocks.forEach(block => {
                if(!block.testMove(x, y)) possible = false;
        })
        return possible;
    }

    removeFromField() { this.blocks.forEach(block => block.removeFromField());}
    addToField() { this.blocks.forEach(block => block.addToField());}

    // ===== getter + setter =====

    get placed() {return this.placed};
}