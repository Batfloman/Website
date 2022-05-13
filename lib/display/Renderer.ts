import Polygon2Helper from "../physic/algorithms/Polygon2Helper.js";
import Polygon2 from "../physic/boundingBox/Polygon2.js";
import { Color } from "../util/Color.js";
import Util from "../util/Util.js";
import Vector2 from "../util/Vector2.js";
import Camara from "./Camara.js";
import Canvas from "./Canvas.js";

export default class Renderer {
  fillColor: Color = Color.none;
  strokeColor: Color = Color.get("black");
  lineWidth: number = 1;

  camara: Camara;
  canvas: Canvas;

  ctx!: CanvasRenderingContext2D;
  offSet!: Vector2;
  scale!: number;

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

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  renderGrid(worldPos: Vector2, xSize: number, ySize: number, cellXSize: number, cellYSize: number) {
    this.updateValues();

    let pos = worldPos.subtract(this.offSet);
    cellXSize *= this.scale;
    cellYSize *= this.scale;
    let w = xSize * cellXSize;
    let h = ySize * cellYSize;

    // center Model
    pos = pos.subtract(new Vector2(w / 2, -h / 2));

    // begin Draw
    this.ctx.beginPath();

    // senkrecht
    for (let i = 0; i <= xSize; i++) {
      this.ctx.moveTo(pos.x + i * cellXSize, -pos.y);
      this.ctx.lineTo(pos.x + i * cellXSize, -pos.y + h);
      this.ctx.stroke();
    }

    // horizontal
    for (let i = 0; i <= ySize; i++) {
      this.ctx.moveTo(pos.x, -pos.y + i * cellYSize);
      this.ctx.lineTo(pos.x + w, -pos.y + i * cellYSize);
      this.ctx.stroke();
    }
  }

  renderPoints(points: Vector2[], radius: number) {
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

  renderText(worldPos: Vector2, text: string) {
    this.updateValues();

    let pos = this.calcPosOnScreen(worldPos);

    this.ctx.beginPath();
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.font = "20px Arial";
    this.ctx.fillText(text, pos.x, pos.y);
    this.ctx.stroke();
  }

  renderCircle(worldPos: Vector2, radius: number) {
    this.updateValues();

    let pos = this.calcPosOnScreen(worldPos);

    this.ctx.beginPath();
    this.ctx.arc(pos.x, pos.y, radius * this.scale, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.stroke();
  }

  connectPoints(points: Vector2[]) {
    this.updateValues();

    const positions: Vector2[] = []
    for(let point of points) {
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
    this.updateValues();

    let translated = Polygon2Helper.translatePoints(polygon.model, worldPos, angle);

    if (renderOutline) this.connectPoints(translated);
    if (renderPoints) this.renderPoints(translated, 1);
  }

  private calcPosOnScreen(worldPos: Vector2): Vector2 {
    let distance = worldPos.subtract(this.camara.pos).scale(this.scale);

    let pos = new Vector2(distance.x + this.offSet.x, -distance.y + this.offSet.y);

    return pos;
  }

  setStrokeColor(color: Color | undefined) {
    if (!color) color = Color.none;
    this.strokeColor = color;
  }
  setFillColor(color: Color | undefined) {
    if (!color) color = Color.none;
    this.fillColor = color;
  }
  setLineWidth(width: number) {
    this.lineWidth = width;
  }
}
