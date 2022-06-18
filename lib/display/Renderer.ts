import { Input } from "../input/Input.js";
import { Polygon2Helper } from "../physic/algorithms/Polygon2Helper.js";
import { Polygon2 } from "../physic/boundingBox/Polygon2.js";
import { Color } from "../util/Color.js";
import { Util, staticPosition } from "../util/Util.js";
import { Vector2 } from "../util/Vector2.js";
import { Camara } from "./Camara.js";
import { Canvas } from "./Canvas.js";

export class Renderer {
  private fillColor: Color = Color.none;
  private strokeColor: Color = Color.get("black");
  private lineWidth: number = 1;

  private camara: Camara;
  private canvas: Canvas;

  private ctx!: CanvasRenderingContext2D;
  private offSet!: Vector2;
  private scale!: number;

  constructor(canvas: Canvas, camara: Camara) {
    this.canvas = canvas;
    this.camara = camara;

    let ctx = this.canvas.htmlCanvas.getContext("2d");
    this.ctx = !ctx ? new CanvasRenderingContext2D() : ctx;
    this.updateValues();

    Input.newEventListener("wheel", this, () => (this.zoomingChanged = true));
  }

  private zoomingChanged: boolean = true;
  private lineWidhtChanged: boolean = true;
  private strokeColorChanged: boolean = true;
  private fillColorChanged: boolean = true;

  private updateValues(scaleLineWidth = true) {
    if (this.zoomingChanged) {
      this.offSet = this.camara.getOffset();
      this.scale = this.camara.scaleValue;
      this.ctx.lineWidth = scaleLineWidth ? this.lineWidth * this.camara.scaleValue : this.lineWidth;
    } else if (this.lineWidhtChanged) {
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

  private calcPosOnScreen(worldPos: Vector2): Vector2 {
    return Util.position.worldPos_to_staticPos(worldPos, this.camara);
  }

  //#endregion

  // ==========================================================================================
  //#region render: worldPosition

  clear() {
    this.updateValues();

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  renderGrid(
    worldPos: Vector2,
    xSize: number,
    ySize: number,
    cellXSize: number,
    cellYSize: number
  ): void {
    this.renderStaticGrid(this.calcPosOnScreen(worldPos), xSize, ySize, cellXSize, cellYSize);
  }

  renderText(worldPos: Vector2, text: string) {
    this.renderStaticText(this.calcPosOnScreen(worldPos), text);
  }

  renderPoints(points: Vector2[], radius: number): void {
    for (let point of points) {
      this.renderCircle(point, radius);
    }
  }

  renderCircle(worldPos: Vector2, radius: number): void {
    this.renderStaticCirle(this.calcPosOnScreen(worldPos), radius * this.scale);
  }

  renderEllipse(worldPos: Vector2, radiusX: number, radiusY: number): void {
    this.renderStaticEllipse(
      this.calcPosOnScreen(worldPos),
      radiusX * this.scale,
      radiusY * this.scale
    );
  }

  renderRectangle(worldPos: Vector2, width: number, height: number) {
    this.renderStaticRectangle(
      this.calcPosOnScreen(worldPos),
      width * this.scale,
      height * this.scale
    );
  }

  connectPoints(points: Vector2[]) {
    this.updateValues();

    const positions: Vector2[] = [];
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

  renderPolygon(
    worldPos: Vector2,
    polygon: Polygon2,
    angle: number,
    renderPoints: boolean = true,
    renderOutline: boolean = true
  ) {
    let translated = Polygon2Helper.translatePoints(polygon.model, worldPos, angle);

    if (renderOutline) this.connectPoints(translated);
    if (renderPoints) this.renderPoints(translated, 1);
  }

  renderLine(start: Vector2, end: Vector2) {
    this.renderStaicLine(this.calcPosOnScreen(start), this.calcPosOnScreen(end));
  }

  //#endregion

  // ==========================================================================================
  //#region math: static Rendering

  private convertStaticPosInValue(pos: staticPosition): Vector2 {
    return Util.position.convertStaticPosInValue(pos, this.camara);
  }
  private convertPercentInValue(widthPercent: string, heightPercent: string): Vector2 {
    return Util.position.convertPercentInValue(this.canvas, widthPercent, heightPercent);
  }
  private convertWidthPercentInValue(percent: string): number {
    return Util.position.convertWidthPercentInValue(this.canvas, percent);
  }
  private convertHeightPercentInValue(percent: string): number {
    return Util.position.convertHeightPercentInValue(this.canvas, percent);
  }

  //#endregion

  // ==========================================================================================
  //#region render: static Position

  renderStaticGrid(
    pos: Vector2 | staticPosition,
    xSize: number | string,
    ySize: number | string,
    cellXSize: number | string,
    cellYSize: number | string,
    scaleLineWidth = true
  ): void {
    this.updateValues(scaleLineWidth);

    if (!(pos instanceof Vector2)) pos = this.convertStaticPosInValue(pos);
    if (!(typeof xSize == "number")) xSize = this.convertWidthPercentInValue(xSize);
    if (!(typeof ySize == "number")) ySize = this.convertWidthPercentInValue(ySize);
    if (!(typeof cellXSize == "number")) cellXSize = this.convertWidthPercentInValue(cellXSize);
    if (!(typeof cellYSize == "number")) cellYSize = this.convertWidthPercentInValue(cellYSize);

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

  renderStaticText(pos: Vector2 | staticPosition, text: string) {
    this.updateValues();

    if (!(pos instanceof Vector2)) pos = this.convertStaticPosInValue(pos);

    // TODO be able to change font styles
    this.ctx.beginPath();
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.font = "20px Arial";
    this.ctx.fillText(text, pos.x, pos.y);
    this.ctx.stroke();
  }

  renderStaticCirle(pos: Vector2 | staticPosition, radius: number, scaleLineWidth = true): void {
    this.updateValues(scaleLineWidth);

    if (!(pos instanceof Vector2)) pos = this.convertStaticPosInValue(pos);

    this.ctx.beginPath();
    this.ctx.arc(pos.x, pos.y, radius, 0, 360);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
  }

  renderStaticEllipse(
    pos: Vector2 | staticPosition,
    radiusX: number,
    radiusY: number,
    scaleLineWidth = true
  ): void {
    this.updateValues(scaleLineWidth);

    if (!(pos instanceof Vector2)) pos = this.convertStaticPosInValue(pos);

    this.ctx.beginPath();
    this.ctx.ellipse(pos.x, pos.y, radiusX, radiusY, 0, 0, 360);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
  }

  renderStaticRectangle(
    pos: Vector2 | staticPosition,
    width: number | string,
    height: number | string,
    scaleLineWidth = true
  ): void {
    this.updateValues(scaleLineWidth);

    if (!(pos instanceof Vector2)) pos = this.convertStaticPosInValue(pos);
    if (!(typeof width == "number")) width = this.convertWidthPercentInValue(width);
    if (!(typeof height == "number")) height = this.convertHeightPercentInValue(height);

    const w = width;
    const h = height;

    this.ctx.beginPath();
    this.ctx.strokeRect(pos.x - w / 2, pos.y - h / 2, w, h);
    this.ctx.fillRect(pos.x - w / 2, pos.y - h / 2, w, h);
    this.ctx.stroke();
  }

  renderStaicLine(
    start: Vector2 | staticPosition,
    end: Vector2 | staticPosition,
    scaleLineWidth: boolean = true
  ): void {
    this.updateValues(scaleLineWidth);

    if (!(start instanceof Vector2)) start = this.convertStaticPosInValue(start);
    if (!(end instanceof Vector2)) end = this.convertStaticPosInValue(end);

    this.ctx.beginPath();
    this.ctx.moveTo(start.x, start.y);
    this.ctx.lineTo(end.x, end.y);

    this.ctx.stroke();
  }

  //#endregion

  // ==========================================================================================
  // #region setter

  setStrokeColor(color: Color | undefined = Color.none) {
    if (this.strokeColor == color) return;
    if (!color) color = Color.none;
    this.strokeColor = color;

    this.strokeColorChanged = true;
  }
  setFillColor(color: Color | undefined = Color.none) {
    if (this.fillColor == color) return;
    if (!color) color = Color.none;
    this.fillColor = color;

    this.fillColorChanged = true;
  }
  setLineWidth(width: number) {
    if (this.lineWidth == width) return;
    this.lineWidth = width;

    this.lineWidhtChanged = true;
  }

  //#endregion
}
