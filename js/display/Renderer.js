import { Input } from "../input/Input.js";
import { Polygon2Helper } from "../physic/algorithms/Polygon2Helper.js";
import { Color } from "../util/Color.js";
import { Util } from "../util/Util.js";
import { Vector2 } from "../util/Vector2.js";
export class Renderer {
    fillColor = Color.none;
    strokeColor = Color.get("black");
    lineWidth = 1;
    camara;
    canvas;
    ctx;
    offSet;
    scale;
    constructor(canvas, camara) {
        this.canvas = canvas;
        this.camara = camara;
        let ctx = this.canvas.htmlCanvas.getContext("2d");
        this.ctx = !ctx ? new CanvasRenderingContext2D() : ctx;
        this.updateValues();
        Input.newEventListener("wheel", this, () => (this.zoomingChanged = true));
    }
    zoomingChanged = true;
    lineWidhtChanged = true;
    strokeColorChanged = true;
    fillColorChanged = true;
    updateValues(scaleLineWidth = true) {
        if (this.zoomingChanged) {
            this.offSet = this.camara.getOffset();
            this.scale = this.camara.scaleValue;
            this.ctx.lineWidth = scaleLineWidth ? this.lineWidth * this.camara.scaleValue : this.lineWidth;
        }
        else if (this.lineWidhtChanged) {
            this.ctx.lineWidth = scaleLineWidth ? this.lineWidth * this.camara.scaleValue : this.lineWidth;
        }
        if (this.strokeColorChanged) {
            this.ctx.strokeStyle = this.strokeColor.getRGBString();
        }
        if (this.fillColorChanged) {
            this.ctx.fillStyle = this.fillColor.getRGBString();
        }
    }
    // ==========================================================================================
    //#region math: not-static rendering
    calcPosOnScreen(worldPos) {
        return Util.position.worldPos_to_staticPos(worldPos, this.camara);
    }
    //#endregion
    // ==========================================================================================
    //#region render: worldPosition
    clear() {
        this.updateValues();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    renderGrid(worldPos, xSize, ySize, cellXSize, cellYSize, scaleLineWidth = true) {
        this.renderStaticGrid(this.calcPosOnScreen(worldPos), xSize, ySize, cellXSize, cellYSize, scaleLineWidth);
    }
    renderText(worldPos, text) {
        this.renderStaticText(this.calcPosOnScreen(worldPos), text);
    }
    renderPoints(points, radius) {
        for (let point of points) {
            this.renderCircle(point, radius);
        }
    }
    renderCircle(worldPos, radius) {
        this.renderStaticCirle(this.calcPosOnScreen(worldPos), radius * this.scale);
    }
    renderEllipse(worldPos, radiusX, radiusY) {
        this.renderStaticEllipse(this.calcPosOnScreen(worldPos), radiusX * this.scale, radiusY * this.scale);
    }
    renderRectangle(worldPos, width, height, scaleLineWidth = true) {
        this.renderStaticRectangle(this.calcPosOnScreen(worldPos), width * this.scale, height * this.scale, scaleLineWidth);
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
    renderLine(start, end, scaleLineWidth = true) {
        this.renderStaicLine(this.calcPosOnScreen(start), this.calcPosOnScreen(end), scaleLineWidth);
    }
    //#endregion
    // ==========================================================================================
    //#region math: static Rendering
    convertStaticPosInValue(pos) {
        return Util.position.convertStaticPosInValue(pos, this.camara);
    }
    convertPercentInValue(widthPercent, heightPercent) {
        return Util.position.convertPercentInValue(this.canvas, widthPercent, heightPercent);
    }
    convertWidthPercentInValue(percent) {
        return Util.position.convertWidthPercentInValue(this.canvas, percent);
    }
    convertHeightPercentInValue(percent) {
        return Util.position.convertHeightPercentInValue(this.canvas, percent);
    }
    //#endregion
    // ==========================================================================================
    //#region render: static Position
    renderStaticGrid(pos, xSize, ySize, cellXSize, cellYSize, scaleLineWidth = true) {
        this.updateValues(scaleLineWidth);
        if (!(pos instanceof Vector2))
            pos = this.convertStaticPosInValue(pos);
        if (!(typeof xSize == "number"))
            xSize = this.convertWidthPercentInValue(xSize);
        if (!(typeof ySize == "number"))
            ySize = this.convertWidthPercentInValue(ySize);
        if (!(typeof cellXSize == "number"))
            cellXSize = this.convertWidthPercentInValue(cellXSize);
        if (!(typeof cellYSize == "number"))
            cellYSize = this.convertWidthPercentInValue(cellYSize);
        const w = cellXSize * xSize * this.scale;
        const h = cellYSize * ySize * this.scale;
        const topLeft = new Vector2(pos.x - w / 2, pos.y - h / 2);
        this.ctx.beginPath();
        // vertical
        for (let x = 0; x <= xSize; x++) {
            this.ctx.moveTo(topLeft.x + x * cellXSize * this.scale, topLeft.y);
            this.ctx.lineTo(topLeft.x + x * cellXSize * this.scale, topLeft.y + h);
            this.ctx.stroke();
        }
        // horizontal
        for (let y = 0; y <= ySize; y++) {
            this.ctx.moveTo(topLeft.x, topLeft.y + y * cellYSize * this.scale);
            this.ctx.lineTo(topLeft.x + w, topLeft.y + y * cellYSize * this.scale);
            this.ctx.stroke();
        }
        this.ctx.stroke();
    }
    renderStaticText(pos, text) {
        this.updateValues();
        if (!(pos instanceof Vector2))
            pos = this.convertStaticPosInValue(pos);
        // TODO be able to change font styles
        this.ctx.beginPath();
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.font = "20px Arial";
        this.ctx.fillText(text, pos.x, pos.y);
        this.ctx.stroke();
    }
    renderStaticCirle(pos, radius, scaleLineWidth = true) {
        this.updateValues(scaleLineWidth);
        if (!(pos instanceof Vector2))
            pos = this.convertStaticPosInValue(pos);
        this.ctx.beginPath();
        this.ctx.arc(pos.x, pos.y, radius, 0, 360);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
    }
    renderStaticEllipse(pos, radiusX, radiusY, scaleLineWidth = true) {
        this.updateValues(scaleLineWidth);
        if (!(pos instanceof Vector2))
            pos = this.convertStaticPosInValue(pos);
        this.ctx.beginPath();
        this.ctx.ellipse(pos.x, pos.y, radiusX, radiusY, 0, 0, 360);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
    }
    renderStaticRectangle(pos, width, height, scaleLineWidth = true) {
        this.updateValues(scaleLineWidth);
        if (!(pos instanceof Vector2))
            pos = this.convertStaticPosInValue(pos);
        if (!(typeof width == "number"))
            width = this.convertWidthPercentInValue(width);
        if (!(typeof height == "number"))
            height = this.convertHeightPercentInValue(height);
        const w = width;
        const h = height;
        this.ctx.beginPath();
        this.ctx.strokeRect(pos.x - w / 2, pos.y - h / 2, w, h);
        this.ctx.fillRect(pos.x - w / 2, pos.y - h / 2, w, h);
        this.ctx.stroke();
    }
    renderStaicLine(start, end, scaleLineWidth = true) {
        this.updateValues(scaleLineWidth);
        if (!(start instanceof Vector2))
            start = this.convertStaticPosInValue(start);
        if (!(end instanceof Vector2))
            end = this.convertStaticPosInValue(end);
        this.ctx.beginPath();
        this.ctx.moveTo(start.x, start.y);
        this.ctx.lineTo(end.x, end.y);
        this.ctx.stroke();
    }
    //#endregion
    // ==========================================================================================
    // #region setter
    setStrokeColor(color = Color.none) {
        if (this.strokeColor == color)
            return;
        if (!color)
            color = Color.none;
        this.strokeColor = color;
        this.strokeColorChanged = true;
    }
    setFillColor(color = Color.none) {
        if (this.fillColor == color)
            return;
        if (!color)
            color = Color.none;
        this.fillColor = color;
        this.fillColorChanged = true;
    }
    setLineWidth(width) {
        if (this.lineWidth == width)
            return;
        this.lineWidth = width;
        this.lineWidhtChanged = true;
    }
}
