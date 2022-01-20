import Vector2f from "../../../util/Vector2f.js";
import GameObject from "../GameElement.js";

export default class Grid extends GameObject {
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

        ctx.closePath();

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

    overlaps(pos) {
        let w = this.canvas.width * this.size.x / 100;
        let h = this.canvas.height * this.size.y / 100;
        let posX = this.canvas.width * this.pos.x / 100;
        let posY = this.canvas.height * this.pos.y / 100;

        return (pos.x >= posX && pos.x <= posX + w && pos.y >= posY && pos.y <= posY + h);
    }

    getCell(pos) {
        let w = this.canvas.width * this.size.x / 100;
        let h = this.canvas.height * this.size.y / 100;
        let posX = this.canvas.width * this.pos.x / 100;
        let posY = this.canvas.height * this.pos.y / 100;
        let dw = w / this.dimension.x;
        let dh = h / this.dimension.y;

        let x, y; 
        for(let i = 0; i < this.dimension.x; i++) {
            if(pos.x >= posX + (dw * i) && pos.x <= posX + (dw * (i + 1))) x = i;
        }
        for(let i = 0; i < this.dimension.y; i++) {
            if(pos.y >= posY + (dh * i) && pos.y <= posY + (dh * (i + 1))) y = i;
        }

        return new Vector2f(x, y);
    }

    isCellEmpty(pos) {
        return this.cells[pos.y][pos.x] == "[]";
    }

    setCell(pos, to) {
        this.cells[pos.y][pos.x] = to;
    }

    clearCell(pos) {
        this.cells[pos.y][pos.x] == "[]";
    }

    inRow(symbol, times) {
        for(let x = 0; x < this.cells[0].length; x++) {
            let inRowAmount = 0;
            let start = 0;
            let end = 0;
            for(let y = 0; y < this.cells.length; y++) {
                if(this.cells[y][x] == symbol) {
                    inRowAmount++;
                    start = start != 0 ? new Vector2f(x, y) : start;
                    end = new Vector2f(x, y);
                } else {
                    inRowAmount = 0;
                    start = 0;
                    end = 0;
                }
                if(inRowAmount >= times) return {is: true, start: start, end: end};
            }
        }
        return {is: false, start: 0, end: 0};
    }

    inColumn(symbol, times) {
        for(let y = 0; y < this.cells.length; y++) {
            let inColumnAmount = 0;
            let start = 0;
            let end = 0;
            for(let x = 0; x < this.cells[0].length; x++) {
                if(this.cells[y][x] == symbol) {
                    inColumnAmount++;
                    start = start != 0 ? new Vector2f(x, y) : start;
                    end = new Vector2f(x, y);
                } else {
                    inColumnAmount = 0;
                    start = 0;
                    end = 0;
                }
                if(inColumnAmount >= times) return {is: true, start: start, end: end};
            }
        }
        return {is: false, start: 0, end: 0};
    }

    inDiagonal(symbol, times) {
        return {is: false, start: 0, end: 0};
    }

    isFull() {
        for(let i = 0; i < this.cells.length; i++) {
            for(let j = 0; j < this.cells[0].length; j++) {
                if(this.cells[i][j] == "[]") return false;
            }
        }
        return true;
    }
}