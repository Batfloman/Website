import Vector2f from "../util/Vector2f.js";

export default class Field {

    static instance;

    /** @type {Vector2f} */
    dimension;
    canvas;
    cellWidth;
    cellHeight;

    cells = new Array();
    
    /** @param {Vector2f} dimension */
    constructor(dimension) {
        this.dimension = dimension;
        Field.instance = this;

        for(let y = 0; y < dimension.y; y++) {
            let row = new Array();
            for(let x = 0; x < dimension.x; x++) {
                row.push("");
            }
            this.cells.push(row);
        }
    }

    init(canvas) { this.canvas = canvas;}

    render() {
        let ctx = this.canvas.getContext("2d");
        
        ctx.lineWidth = this.canvas.width / 225 < 1 ? 1 : this.canvas.width / 225;
        ctx.strokeStyle = "rgb(60, 60, 60)";

        this.cellWidth = this.canvas.width / this.dimension.x;
        this.cellHeight = this.canvas.height / this.dimension.y;
        
        for(let x = 1; x < this.dimension.x; x++) {
            ctx.moveTo(x * this.cellWidth, 0);
            ctx.lineTo(x * this.cellWidth, this.canvas.height);
        }
        for(let y = 1; y < this.dimension.y; y++) {
            ctx.moveTo(0, y * this.cellHeight);
            ctx.lineTo(this.canvas.width, y * this.cellHeight);
        }
        
        for(let y = 0; y < this.dimension.y; y++) {
            for(let x = 0; x < this.dimension.x; x++) {
                if(this.cells[y][x] == "") continue;
                let block = this.cells[y][x];
                block.render();
            }
        }

        ctx.stroke();
    }

    isCellOcupied(pos) {
        try {
            return this.cells[pos.y][pos.x] === "";
        } catch(e) {
            return false;
        }
    }

    // ===== getter + setter =====

    get cellWidth() { return this.cellWidth;}
    get cellHeight() { return this.cellHeight;}
    get dimension() { return this.dimension;}
    get cells() {return this.cells;}
    getCell(pos) { return this.cells[pos.y][pos.x];}
    
    setCell(pos, to) {
        try {
            this.cells[pos.y][pos.x] = to;
        } catch(e) {
            console.log(pos.y, pos.x);
        }
    }

    static get instance () { return Field.instance}
}