import { SceneObject } from "../objects/SceneObject.js";
import Vector2 from "../../util/Vector2.js";
import IRenderable from "../../display/IRenderable.js";
import Renderer from "../../display/Renderer.js";
import { Color } from "../../util/Color.js";
export default class World implements IRenderable {
    pos: Vector2;
    constructor(pos?: Vector2, backgroundColor?: Color);
    isInsideWorld(point: Vector2): boolean;
    private backgroundColor;
    shouldRender(): boolean;
    render(renderer: Renderer): void;
    setBackground(color: Color): void;
    objects: SceneObject[];
    addObject(obj: SceneObject): void;
    removeObject(obj: SceneObject): SceneObject | undefined;
    findObjects<T extends SceneObject>(clasName: string, exclude?: T | T[]): T[];
    private objectMap;
    private addToMap;
    private removeFromMap;
    private chunkSize;
    private chunks;
    findChunkOf(obj: SceneObject): Vector2;
    addToChunks(obj: SceneObject): void;
    addToChunk(x: number, y: number, obj: SceneObject): void;
    getChunk(x: number, y: number): SceneObject[] | undefined;
    setChunkSize(size: number): void;
}
