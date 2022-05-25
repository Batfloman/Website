import Input from "../input/Input.js";
import Polygon2Helper from "../physic/algorithms/Polygon2Helper.js";
import Polygon2 from "../physic/boundingBox/Polygon2.js";
import { Color } from "../util/Color.js";
import Util from "../util/Util.js";
import Vector2 from "../util/Vector2.js";
import Camara from "./Camara.js";
import Canvas from "./Canvas.js";

type staticPosition = "center";

export default class Renderer {
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

    Input.newEventListener("wheel", this, () => this.valuesChanged = true)
  }

  private valuesChanged: boolean = false;

  private updateValues() {
    if(!this.valuesChanged) return;

    this.offSet = this.camara.getOffset();
    this.scale = this.camara.scaleValue;
    this.ctx.strokeStyle = this.strokeColor.getRGBString();
    this.ctx.fillStyle = this.fillColor.getRGBString();
    this.ctx.lineWidth = this.lineWidth * this.camara.scaleValue;
  }

  // ==========================================================================================
  //#region math: not-static rendering

  private calcPosOnScreen(worldPos: Vector2): Vector2 {
    const distance = worldPos.subtract(this.camara.pos).scale(this.scale);

    distance.x = Util.math.round(distance.x, 2);
    distance.y = Util.math.round(-distance.y, 2);

    return distance.add(this.offSet);
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

  //#endregion

  // ==========================================================================================
  //#region math: static Rendering

  private convertStaticPosInValue(pos: staticPosition): Vector2 {
    switch (pos) {
      case "center":
        return this.offSet;
        break;
      default:
        return new Vector2();
    }
  }

  private convertPercentInValue(widthPercent: string, heightPercent: string): Vector2 {
    return new Vector2(
      this.convertWidthPercentInValue(widthPercent),
      this.convertHeightPercentInValue(heightPercent)
    );
  }

  private convertWidthPercentInValue(percent: string): number {
    const number = (Number.parseFloat(percent) / 100) * this.canvas.width;
    return isNaN(number) ? 0 : number;
  }

  private convertHeightPercentInValue(percent: string): number {
    const number = (Number.parseFloat(percent) / 100) * this.canvas.height;
    return isNaN(number) ? 0 : number;
  }

  //#endregion

  // ==========================================================================================
  //#region render: static Position

  renderStaticGrid(
    pos: Vector2 | staticPosition,
    xSize: number | string,
    ySize: number | string,
    cellXSize: number | string,
    cellYSize: number | string
  ): void {
    this.updateValues();

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

    this.ctx.beginPath();
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.font = "20px Arial";
    this.ctx.fillText(text, pos.x, pos.y);
    this.ctx.stroke();
  }

  renderStaticCirle(pos: Vector2 | staticPosition, radius: number): void {
    this.updateValues();

    if (!(pos instanceof Vector2)) pos = this.convertStaticPosInValue(pos);

    this.ctx.beginPath();
    this.ctx.arc(pos.x, pos.y, radius, 0, 360);
    this.ctx.fill();
    this.ctx.stroke();
  }

  renderStaticRectangle(
    pos: Vector2 | staticPosition,
    width: number | string,
    height: number | string
  ): void {
    this.updateValues();

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

  //#endregion

  // ==========================================================================================
  // #region setter

  setStrokeColor(color: Color | undefined = Color.none) {
    if(this.strokeColor == color) return;
    if (!color) color = Color.none;
    this.strokeColor = color;

    this.valuesChanged = true;
  }
  setFillColor(color: Color | undefined = Color.none) {
    if(this.fillColor == color) return;
    if (!color) color = Color.none;
    this.fillColor = color;

    this.valuesChanged = true;
  }
  setLineWidth(width: number) {
    if(this.lineWidth == width) return;
    this.lineWidth = width;

    this.valuesChanged = true;
  }

  //#endregion
}
