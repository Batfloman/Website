import Polygon2Helper from "../physic/algorithms/Polygon2Helper.js";
import { Color } from "../util/Color.js";
import Util from "../util/Util.js";
import Vector2 from "../util/Vector2.js";
export default class Renderer {
    constructor(canvas, camara) {
        this.fillColor = Color.none;
        this.strokeColor = Color.get("black");
        this.lineWidth = 1;
        this.canvas = canvas;
        this.camara = camara;
        let ctx = this.canvas.htmlCanvas.getContext("2d");
        this.ctx = !ctx ? new CanvasRenderingContext2D() : ctx;
        this.updateValues();
    }
    updateValues() {
        this.offSet = this.camara.getOffset();
        this.scale = this.camara.scale;
        this.ctx.strokeStyle = this.strokeColor.getRGBString();
        this.ctx.fillStyle = this.fillColor.getRGBString();
        this.ctx.lineWidth = this.lineWidth * this.camara.scale;
    }
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    renderGrid(worldPos, xSize, ySize, cellXSize, cellYSize) {
        this.updateValues();
        let pos = worldPos.subtract(this.offSet);
        cellXSize *= this.scale;
        cellYSize *= this.scale;
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
    renderPoints(points, radius) {
        this.updateValues();
        radius *= this.scale;
        points.forEach((point) => {
            let pos = this.calcPosOnScreen(point);
            this.ctx.beginPath();
            this.ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
        });
    }
    renderText(worldPos, text) {
        this.updateValues();
        let pos = this.calcPosOnScreen(worldPos);
        this.ctx.beginPath();
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.font = "20px Arial";
        this.ctx.fillText(text, pos.x, pos.y);
        this.ctx.stroke();
    }
    renderStaticText(pos, text) {
        this.updateValues();
        this.ctx.beginPath();
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.font = "20px Arial";
        this.ctx.fillText(text, pos.x, pos.y);
        this.ctx.stroke();
    }
    renderCircle(worldPos, radius) {
        this.updateValues();
        let pos = this.calcPosOnScreen(worldPos);
        this.ctx.beginPath();
        this.ctx.arc(pos.x, pos.y, radius * this.scale, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
    }
    renderRectangle(worldPos, width, height) {
        this.updateValues();
        const pos = this.calcPosOnScreen(worldPos);
        const w = width * this.scale;
        const h = height * this.scale;
        this.ctx.beginPath();
        this.ctx.strokeRect(pos.x - (w / 2), pos.y + (h / 2), w, h);
        this.ctx.fill();
        this.ctx.stroke();
    }
    connectPoints(points) {
        this.updateValues();
        const positions = [];
        for (let point of points) {
            positions.push(this.calcPosOnScreen(point));
        }
        for (let i = 0; i < points.length; i++) {
            let last = Util.array.getItem(positions, i - 1);
            let current = Util.array.getItem(positions, i);
            this.ctx.beginPath();
            this.ctx.moveTo(last.x, last.y);
            this.ctx.lineTo(current.x, current.y);
            this.ctx.stroke();
        }
        this.ctx.fill();
        this.ctx.stroke();
    }
    renderPolygon(worldPos, polygon, angle, renderPoints = true, renderOutline = true) {
        this.updateValues();
        let translated = Polygon2Helper.translatePoints(polygon.model, worldPos, angle);
        if (renderOutline)
            this.connectPoints(translated);
        if (renderPoints)
            this.renderPoints(translated, 1);
    }
    calcPosOnScreen(worldPos) {
        let distance = worldPos.subtract(this.camara.pos).scale(this.scale);
        let pos = new Vector2(distance.x + this.offSet.x, -distance.y + this.offSet.y);
        return pos;
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
