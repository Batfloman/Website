import Vector2f from "../../util/Vector2f.js";
import GameObject from "../GameObject.js";

export default class Grid extends GameObject {
    cells: string[][];
    dimension: Vector2f;
    size: Vector2f;
    
    constructor(dimension: Vector2f, size: Vector2f, pos) {
        super();

        this.dimension = dimension;
        this.size = size;
        this.pos = pos;

        this.clear();
    }

    render(): void {
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

    clear(): void {
        this.cells = new Array();

        for(let y = 0; y < this.dimension.y; y++) {
            let row = new Array();
            for(let x = 0; x < this.dimension.x; x++) {
                row.push("[]");
            }
            this.cells.push(row);
        }
    }

    overlaps(pos: Vector2f): boolean {
        let w = this.canvas.width * this.size.x / 100;
        let h = this.canvas.height * this.size.y / 100;
        let posX = this.canvas.width * this.pos.x / 100;
        let posY = this.canvas.height * this.pos.y / 100;

        return (pos.x >= posX && pos.x <= posX + w && pos.y >= posY && pos.y <= posY + h);
    }

    getCell(pos: Vector2f): Vector2f {
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

    isCellEmpty(pos: Vector2f): boolean {
        return this.cells[pos.y][pos.x] == "[]";
    }

    setCell(pos: Vector2f, to: string): void {
        this.cells[pos.y][pos.x] = to;
    }
}