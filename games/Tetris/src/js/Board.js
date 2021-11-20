import GameObject from "../../../../templates/gameAssets/GameObject.js";

export default class Board extends GameObject{
    x;
    y;

    cells;
    
    constructor(x, y) {
        super();

        this.x = x;
        this.y = y;

        this.cells = new Array();
        for(let j = 0; j < y; j++) {
            let row = new Array();
            for(let i = 0; i < x; i++) {
                row.push("[]");
            }
            this.cells.push(row);
        }
    }

    render() {
        let ctx = this.canvas.getContext("2d");

        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;

        for(let i = 0; i <= this.y; i++) {
            ctx.moveTo(0, this.canvas.height / this.y * i);
            ctx.lineTo(this.canvas.width, this.canvas.height / this.y * i);
        }
        for(let j = 0; j <= this.x; j++) {
            ctx.moveTo(this.canvas.width / this.x * j, 0);
            ctx.lineTo(this.canvas.width / this.x * j, this.canvas.height);
        }

        ctx.stroke();
    }
}