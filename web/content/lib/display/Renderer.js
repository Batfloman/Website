import { Color } from "../util/Color.js";
import Vector2 from "../util/Vector2.js";
export default class Renderer {
    constructor(canvas, camara) {
        this.fillColor = Color.none;
        this.strokeColor = Color.none;
        this.lineWidth = 1;
        this.canvas = canvas;
        this.camara = camara;
        this.updateValues();
    }
    updateValues() {
        this.ctx = this.updateCtx();
        this.offSet = this.camara.getOffset();
        this.ctx.strokeStyle = this.strokeColor.getRGBString();
        this.ctx.fillStyle = this.fillColor.getRGBString();
        this.ctx.lineWidth = this.lineWidth * this.camara.scale;
    }
    updateCtx() {
        let ctx = this.canvas.htmlCanvas.getContext("2d");
        return !ctx ? new CanvasRenderingContext2D() : ctx;
    }
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    grid(worldPos, xSize, ySize, cellXSize, cellYSize) {
        this.updateValues();
        let pos = worldPos.subtract(this.offSet);
        cellXSize *= this.camara.scale;
        cellYSize *= this.camara.scale;
        let w = xSize * cellXSize;
        let h = ySize * cellYSize;
        pos = pos.subtract(new Vector2(w / 2, -h / 2));
        this.ctx.beginPath();
        for (let i = 0; i <= xSize; i++) {
            this.ctx.moveTo(pos.x + i * cellXSize, -pos.y);
            this.ctx.lineTo(pos.x + i * cellXSize, -pos.y + h);
            this.ctx.stroke();
        }
        for (let i = 0; i <= ySize; i++) {
            this.ctx.moveTo(pos.x, -pos.y + i * cellYSize);
            this.ctx.lineTo(pos.x + w, -pos.y + i * cellYSize);
            this.ctx.stroke();
        }
    }
    setStrokeColor(color) {
        if (!color)
            color = Color.none;
        this.strokeColor = color;
    }
    setFillColor(color) {
        if (!color)
            color = Color.none;
        this.fillColor = color;
    }
    setLineWidth(width) {
        this.lineWidth = width;
    }
}
