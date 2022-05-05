import { Color } from "../util/Color.js";
import Vector2 from "../util/Vector2.js";
import Camara from "./Camara.js";
import Canvas from "./Canvas.js";

export default class Renderer {
  fillColor: Color = Color.none;
  strokeColor: Color = Color.none;
  lineWidth: number = 1;

  camara: Camara;
  canvas: Canvas;

  ctx!: CanvasRenderingContext2D;
  offSet!: Vector2;

  constructor(canvas: Canvas, camara: Camara) {
    this.canvas = canvas;
    this.camara = camara;

    this.updateValues();
  }

  

  private updateValues() {
    this.ctx = this.updateCtx();
    this.offSet = this.camara.getOffset();
    this.ctx.strokeStyle = this.strokeColor.getRGBString();
    this.ctx.fillStyle = this.fillColor.getRGBString();
    this.ctx.lineWidth = this.lineWidth * this.camara.scale;
  }

  private updateCtx(): CanvasRenderingContext2D {
    let ctx = this.canvas.htmlCanvas.getContext("2d");
    return !ctx ? new CanvasRenderingContext2D() : ctx;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  grid(
    worldPos: Vector2,
    xSize: number,
    ySize: number,
    cellXSize: number,
    cellYSize: number
  ) {
    this.updateValues();

    let pos = worldPos.subtract(this.offSet);
    cellXSize *= this.camara.scale;
    cellYSize *= this.camara.scale
    let w = xSize * cellXSize;
    let h = ySize * cellYSize;

    // center Model
    pos = pos.subtract(new Vector2(w/2, -h/2));

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
