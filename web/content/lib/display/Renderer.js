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
    calcPosOnScreen(worldPos) {
        const distance = worldPos.subtract(this.camara.pos).scale(this.scale);
        distance.x = Util.math.round(distance.x, 2);
        distance.y = Util.math.round(-distance.y, 2);
        return distance.add(this.offSet);
    }
    clear() {
        this.updateValues();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    renderGrid(worldPos, xSize, ySize, cellXSize, cellYSize) {
        this.renderStaticGrid(this.calcPosOnScreen(worldPos), xSize, ySize, cellXSize, cellYSize);
    }
    renderStaticGrid(pos, xSize, ySize, cellXSize, cellYSize) {
        this.updateValues();
        const w = cellXSize * xSize * this.scale;
        const h = cellYSize * ySize * this.scale;
        const topLeft = new Vector2(pos.x - w / 2, pos.y - h / 2);
        for (let x = 0; x <= xSize; x++) {
            this.ctx.moveTo(topLeft.x + x * cellXSize * this.scale, topLeft.y);
            this.ctx.lineTo(topLeft.x + x * cellXSize * this.scale, topLeft.y + h);
            this.ctx.stroke();
        }
        for (let y = 0; y <= ySize; y++) {
            this.ctx.moveTo(topLeft.x, topLeft.y + y * cellYSize * this.scale);
            this.ctx.lineTo(topLeft.x + w, topLeft.y + y * cellYSize * this.scale);
            this.ctx.stroke();
        }
    }
    renderText(worldPos, text) {
        this.renderStaticText(this.calcPosOnScreen(worldPos), text);
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
    renderPoints(points, radius) {
        for (let point of points) {
            this.renderCircle(point, radius);
        }
    }
    renderCircle(worldPos, radius) {
        this.renderStaticCirle(this.calcPosOnScreen(worldPos), radius * this.scale);
    }
    renderStaticCirle(pos, radius) {
        this.updateValues();
        this.ctx.beginPath();
        this.ctx.arc(pos.x, pos.y, radius, 0, 360);
        this.ctx.fill();
        this.ctx.stroke();
    }
    renderRectangle(worldPos, width, height) {
        this.renderStaticRectangle(this.calcPosOnScreen(worldPos), width * this.scale, height * this.scale);
    }
    renderStaticRectangle(pos, width, height) {
        this.updateValues();
        const w = width;
        const h = height;
        this.ctx.beginPath();
        this.ctx.strokeRect(pos.x - w / 2, pos.y + h / 2, w, h);
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
        let translated = Polygon2Helper.translatePoints(polygon.model, worldPos, angle);
        if (renderOutline)
            this.connectPoints(translated);
        if (renderPoints)
            this.renderPoints(translated, 1);
    }
    setStrokeColor(color = Color.none) {
        if (!color)
            color = Color.none;
        this.strokeColor = color;
    }
    setFillColor(color = Color.none) {
        if (!color)
            color = Color.none;
        this.fillColor = color;
    }
    setLineWidth(width) {
        this.lineWidth = width;
    }
}
