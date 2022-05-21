import Polygon2Helper from "../physic/algorithms/Polygon2Helper.js";
import Polygon2 from "../physic/boundingBox/Polygon2.js";
import { Color } from "../util/Color.js";
import Util from "../util/Util.js";
import Vector2 from "../util/Vector2.js";
import Camara from "./Camara.js";
import Canvas from "./Canvas.js";

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
  }

  private updateValues() {
    this.offSet = this.camara.getOffset();
    this.scale = this.camara.scale;
    this.ctx.strokeStyle = this.strokeColor.getRGBString();
    this.ctx.fillStyle = this.fillColor.getRGBString();
    this.ctx.lineWidth = this.lineWidth * this.camara.scale;
  }

  private calcPosOnScreen(worldPos: Vector2): Vector2 {
    const distance = worldPos.subtract(this.camara.pos).scale(this.scale);

    distance.y = -distance.y;

    return distance.add(this.offSet);

    // return new Vector2(distance.x + this.offSet.x, distance.y + this.offSet.y);
  }

  // ==========================================================================================
  // render

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

  renderStaticGrid(
    pos: Vector2,
    xSize: number,
    ySize: number,
    cellXSize: number,
    cellYSize: number
  ): void {
    this.updateValues();

    const w = cellXSize * xSize * this.scale;
    const h = cellYSize * ySize * this.scale;

    const topLeft = new Vector2(
      pos.x - w / 2,
      pos.y - h / 2
    );

    // vertical
    for(let x = 0; x <= xSize; x++) {
      this.ctx.moveTo(topLeft.x + x * cellXSize * this.scale, topLeft.y);
      this.ctx.lineTo(topLeft.x + x * cellXSize * this.scale, topLeft.y + h);
      this.ctx.stroke();
    }

    // horizontal
    for(let y = 0; y <= ySize; y++) {
      this.ctx.moveTo(topLeft.x, topLeft.y + y * cellYSize * this.scale);
      this.ctx.lineTo(topLeft.x + w, topLeft.y + y * cellYSize * this.scale);
      this.ctx.stroke();
    }
  }

  renderText(worldPos: Vector2, text: string) {
    this.renderStaticText(this.calcPosOnScreen(worldPos), text);
  }

  renderStaticText(pos: Vector2, text: string) {
    this.updateValues();

    this.ctx.beginPath();
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.font = "20px Arial";
    this.ctx.fillText(text, pos.x, pos.y);
    this.ctx.stroke();
  }

  renderPoints(points: Vector2[], radius: number): void {
    for (let point of points) {
      this.renderCircle(point, radius);
    }
  }

  renderCircle(worldPos: Vector2, radius: number): void {
    this.renderStaticCirle(this.calcPosOnScreen(worldPos), radius);
  }

  renderStaticCirle(pos: Vector2, radius: number): void {
    this.updateValues();

    this.ctx.beginPath();
    this.ctx.arc(pos.x, pos.y, radius * this.scale, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.stroke();
  }

  renderRectangle(worldPos: Vector2, width: number, height: number) {
    this.renderStaticRectangle(this.calcPosOnScreen(worldPos), width, height);
  }

  renderStaticRectangle(pos: Vector2, width: number, height: number): void {
    this.updateValues();

    const w = width * this.scale;
    const h = height * this.scale;

    this.ctx.beginPath();
    this.ctx.strokeRect(pos.x - w / 2, pos.y + h / 2, w, h);
    this.ctx.fill();
    this.ctx.stroke();
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

  // ==========================================================================================
  // setter

  setStrokeColor(color: Color | undefined = Color.none) {
    if (!color) color = Color.none;
    this.strokeColor = color;
  }
  setFillColor(color: Color | undefined = Color.none) {
    if (!color) color = Color.none;
    this.fillColor = color;
  }
  setLineWidth(width: number) {
    this.lineWidth = width;
  }
}
