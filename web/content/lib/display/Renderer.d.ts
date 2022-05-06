import Polygon2 from "../physic/boundingBox/Polygon2.js";
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
    scale: number;
    constructor(canvas: Canvas, camara: Camara);
    private updateValues;
    private updateCtx;
    clear(): void;
    renderGrid(worldPos: Vector2, xSize: number, ySize: number, cellXSize: number, cellYSize: number): void;
    renderPoints(points: Vector2[], radius: number): void;
    connectPoints(points: Vector2[]): void;
    polygon(worldPos: Vector2, polygon: Polygon2, angle: number, renderPoints?: boolean, renderOutline?: boolean): void;
    private calcPosOnScreen;
    setStrokeColor(color: Color | undefined): void;
    setFillColor(color: Color | undefined): void;
    setLineWidth(width: number): void;
}
