import { Camara } from "../../display/Camara.js";
import { Canvas } from "../../display/Canvas.js";
import { IRenderable } from "../../display/IRenderable.js";
import { Renderer } from "../../display/Renderer.js";
import { Game } from "../../games/Game.js.js";
export declare abstract class SceneObject implements IRenderable {
    game: Game;
    canvas: Canvas;
    camara: Camara;
    zIndex: number;
    init(game: Game, canvas: Canvas): void;
    abstract update(dt: number): void;
    abstract render(renderer: Renderer): void;
    abstract shouldUpdate(): boolean;
    abstract shouldRender(): boolean;
}
