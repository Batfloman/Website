import { Canvas } from "../../../display/Canvas.js";
import { Renderer } from "../../../display/Renderer.js";
import { Game } from "../../../games/Game.js";
import { Rectangle } from "../../../physic/boundingBox/Rectangle.js";
import { Color } from "../../../util/Color.js";
import { staticPosition } from "../../../util/Util.js";
import { Vector2 } from "../../../util/Vector2.js";
import { WorldObject } from "../WorldObject.js";
export declare class UISimpleButton extends WorldObject<Rectangle> {
    fillColor: Color;
    borderColor: Color;
    textColor: Color;
    staticPos: Vector2 | staticPosition;
    staticPosValue: Vector2;
    staticWidth: number;
    staticHeight: number;
    text: string;
    constructor(staticPos: Vector2 | staticPosition, width: number, height: number, text?: string);
    init(game: Game, canvas: Canvas): void;
    update2(dt: number): void;
    render(renderer: Renderer): void;
    shouldRender(): boolean;
    shouldUpdate(): boolean;
    translatePoints(): Vector2[];
    calcStaticPosValue(): Vector2;
    calcWorldPos(): Vector2;
}
