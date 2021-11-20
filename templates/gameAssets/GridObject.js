import SceneObject from "./SceneObject.js";
import Vector2f from "./../util/Vector2f.js";

export default class Grid extends SceneObject {
    /** @type {Array} */
    cells;
    /** @type {Vector2f} */
    dimension;
    /** @type {Vector2f} */
    pos;
    /** @type {Vector2f} */
    size;
    
    /**
     * @param {*} dimension amount of x and y Cells
     * @param {*} size - relative size to Canvas
     * @param {*} pos - relative position of top left corner
     */
    constructor(dimension, size, pos) {
        super();

        this.dimension = dimension;
        this.size = size;
        this.pos = pos;

        this.clear();
    }

    update(dt) { return;}

    render() {
        let ctx = this.canvas.getContext('2d');

        let w = this.canvas.width * this.size.x / 100;
        let h = this.canvas.height * this.size.y / 100;
        let dx = w / this.dimension.x;
        let dy = h / this.dimension.y;
        let offSetX = this.canvas.width * this.pos.x / 100;
        let offSetY = this.canvas.height * this.pos.y / 100;

        ctx.lineWidth = 5;
        
        ctx.beginPath();

        for(let i = 0; i <= this.dimension.x; i++) {
            ctx.moveTo(offSetX + i * dx, offSetY + 0);
            ctx.lineTo(offSetX + i * dx, offSetY + h);
        }
        for(let i = 0; i <= this.dimension.y; i++) {
            ctx.moveTo(offSetX + 0, offSetY + i * dy);
            ctx.lineTo(offSetX + w, offSetY + i * dy);
        }
        

        ctx.stroke();
    }

    clear() {
        this.cells = new Array();

        for(let y = 0; y < this.dimension.y; y++) {
            let row = new Array();
            for(let x = 0; x < this.dimension.x; x++) {
                row.push("[]");
            }
            this.cells.push(row);
        }
    }
}