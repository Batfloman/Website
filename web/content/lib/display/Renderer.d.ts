import Polygon2 from "../physic/boundingBox/Polygon2.js";
import { Color } from "../util/Color.js";
import Vector2 from "../util/Vector2.js";
import Camara from "./Camara.js";
import Canvas from "./Canvas.js";
export default class Renderer {
    private fillColor;
    private strokeColor;
    private lineWidth;
    private camara;
    private canvas;
    private ctx;
    private offSet;
    private scale;
    constructor(canvas: Canvas, camara: Camara);
    private updateValues;
    clear(): void;
    renderGrid(worldPos: Vector2, xSize: number, ySize: number, cellXSize: number, cellYSize: number): void;
    renderPoints(points: Vector2[], radius: number): void;
    renderText(worldPos: Vector2, text: string): void;
    renderStaticText(pos: Vector2, text: string): void;
    renderCircle(worldPos: Vector2, radius: number): void;
    connectPoints(points: Vector2[]): void;
    renderPolygon(worldPos: Vector2, polygon: Polygon2, angle: number, renderPoints?: boolean, renderOutline?: boolean): void;
    private calcPosOnScreen;
    setStrokeColor(color: Color | undefined): void;
    setFillColor(color: Color | undefined): void;
    setLineWidth(width: number): void;
}
