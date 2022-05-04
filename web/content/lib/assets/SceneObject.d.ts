import Canvas from "../display/Canvas.js";
import IRenderable from "../display/IRenderable.js";
import { Game } from "../games/Game.js";
export declare abstract class SceneObject implements IRenderable {
    game: Game;
    canvas: Canvas;
    zIndex: number;
    init(game: Game, canvas: Canvas): void;
    abstract update(dt: number): void;
    abstract render(ctx: CanvasRenderingContext2D): void;
}
