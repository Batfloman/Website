import { Polygon2 } from "../physic/boundingBox/Polygon2.js";
import { Color } from "../util/Color.js";
import { staticPosition } from "../util/Util.js";
import { Vector2 } from "../util/Vector2.js";
import { Camara } from "./Camara.js";
import { Canvas } from "./Canvas.js";
export declare class Renderer {
    private fillColor;
    private strokeColor;
    private lineWidth;
    private camara;
    private canvas;
    private ctx;
    private offSet;
    private scale;
    constructor(canvas: Canvas, camara: Camara);
    private zoomingChanged;
    private lineWidhtChanged;
    private strokeColorChanged;
    private fillColorChanged;
    private updateValues;
    private calcPosOnScreen;
    clear(): void;
    renderGrid(worldPos: Vector2, xSize: number, ySize: number, cellXSize: number, cellYSize: number, scaleLineWidth?: boolean): void;
    renderText(worldPos: Vector2, text: string): void;
    renderPoints(points: Vector2[], radius: number): void;
    renderCircle(worldPos: Vector2, radius: number): void;
    renderEllipse(worldPos: Vector2, radiusX: number, radiusY: number): void;
    renderRectangle(worldPos: Vector2, width: number, height: number, scaleLineWidth?: boolean): void;
    connectPoints(points: Vector2[]): void;
    renderPolygon(worldPos: Vector2, polygon: Polygon2, angle: number, renderPoints?: boolean, renderOutline?: boolean): void;
    renderLine(start: Vector2, end: Vector2, scaleLineWidth?: boolean): void;
    private convertStaticPosInValue;
    private convertPercentInValue;
    private convertWidthPercentInValue;
    private convertHeightPercentInValue;
    renderStaticGrid(pos: Vector2 | staticPosition, xSize: number | string, ySize: number | string, cellXSize: number | string, cellYSize: number | string, scaleLineWidth?: boolean): void;
    renderStaticText(pos: Vector2 | staticPosition, text: string): void;
    renderStaticCirle(pos: Vector2 | staticPosition, radius: number, scaleLineWidth?: boolean): void;
    renderStaticEllipse(pos: Vector2 | staticPosition, radiusX: number, radiusY: number, scaleLineWidth?: boolean): void;
    renderStaticRectangle(pos: Vector2 | staticPosition, width: number | string, height: number | string, scaleLineWidth?: boolean): void;
    renderStaicLine(start: Vector2 | staticPosition, end: Vector2 | staticPosition, scaleLineWidth?: boolean): void;
    setStrokeColor(color?: Color | undefined): void;
    setFillColor(color?: Color | undefined): void;
    setLineWidth(width: number): void;
}
