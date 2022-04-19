export default class Board {
    constructor(x, y) {
        this.cells = new Array();
        this.x = !x ? 8 : x;
        this.y = !y ? 8 : y;
        for (let i = 0; i < this.x; i++) {
            let row = new Array();
            for (let j = 0; j < this.y; j++) {
                row.push("[]");
            }
            this.cells.push(row);
        }
    }
    render(canvas) {
        let ctx = canvas.getContext('2d');
        for (let i = 0; i < this.y; i++) {
            let isFirst = i % 2 == 0;
            for (let j = 0; j < this.x; j++) {
                let w = canvas.width / this.x;
                let h = canvas.height / this.y;
                ctx.fillStyle = isFirst ? "antiquewhite" : "rgb(120, 145, 76)";
                ctx.storkeStyle = isFirst ? "antiquewhite" : "rgb(120, 145, 76)";
                isFirst = !isFirst;
                ctx.fillRect(j * w, i * h, w, h);
            }
        }
        ctx.stroke();
    }
}
