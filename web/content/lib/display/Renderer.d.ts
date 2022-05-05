import { Color } from "../util/Color.js";
import Vector2 from "../util/Vector2.js";
import Camara from "./Camara.js";
import Canvas from "./Canvas.js";
export default class Renderer {
    fillColor: Color;
    strokeColor: Color;
    lineWidth: number;
    camara: Camara;
    canvas: Canvas;
    ctx: CanvasRenderingContext2D;
    offSet: Vector2;
    constructor(canvas: Canvas, camara: Camara);
    private updateValues;
    private updateCtx;
    clear(): void;
    grid(worldPos: Vector2, xSize: number, ySize: number, cellXSize: number, cellYSize: number): void;
    setStrokeColor(color: Color | undefined): void;
    setFillColor(color: Color | undefined): void;
    setLineWidth(width: number): void;
}
