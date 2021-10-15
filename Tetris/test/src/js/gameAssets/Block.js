import Color from "../util/Color.js";
import Vector2f from "../util/Vector2f.js";
import Field from "./Field.js";
import GameObject from "./gameObject.js";

export default class Block extends GameObject {
    /** @type {Vector2f} */
    pos;
    /** @type {Color} */
    color;

    /**
     * @param {{x: number; y: number;}} pos
     * @param {Color} color
     */
    constructor(pos, color) {
        super();

        this.pos = pos;
        this.color = color;
        Field.instance.setCell(this.pos, this);
    }

    move(x, y) {
        this.pos.x += x;
        this.pos.y += y;
    }

    testMove(x, y) {
        return Field.instance.isCellOcupied({x: this.pos.x + x, y: this.pos.y + y});
    }

    removeFromField() { Field.instance.setCell(this.pos, "");}
    addToField() { Field.instance.setCell(this.pos, this);}

    render() {
        let ctx = this.canvas.getContext("2d");
        ctx.fillStyle = this.color.getRGB();
        ctx.fillRect(this.pos.x * Field.instance.cellWidth, this.pos.y * Field.instance.cellHeight, Field.instance.cellWidth, Field.instance.cellHeight);
        ctx.stroke();
    }

    // ===== getter + setter =====

    get pos() { return this.pos;}
    get color() { return this.color;}

    /** @param {{x: number; y: number;}} pos */
    set pos(pos) { this.pos = pos;}
    /** @param {Color} color */
    set color(color) { this.color = color;}
}