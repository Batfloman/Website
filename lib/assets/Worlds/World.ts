import { SceneObject } from "../objects/SceneObject.js";
import Vector2 from "../../util/Vector2.js";
import Util from "../../util/Util.js";
import IRenderable from "../../display/IRenderable.js";
import Renderer from "../../display/Renderer.js";
import { Color } from "../../util/Color.js";
import { WorldObject } from "../objects/WorldObject.js";
import { HitBox } from "../../physic/boundingBox/HitBox.js";
import { TwoKeyMap } from "../../util/TwoKeyMap.js";
import { Chunk } from "./Chunk.js";

export default class World implements IRenderable {
  public pos: Vector2;
  public objects: SceneObject[] = [];

  constructor(pos: Vector2 = new Vector2(), backgroundColor: Color = Color.get("white")) {
    this.pos = pos;
    this.backgroundColor = backgroundColor;
  }

  // ==========================================================================================
  // #region positioning, collision...

  isInsideWorld(point: Vector2): boolean {
    // this World is infinit
    return true;
  }

  //#endregion

  // ==========================================================================================
  // #region render

  private backgroundColor: Color;

  shouldRender(): boolean {
    return true;
  }

  render(renderer: Renderer): void {
    renderer.setStrokeColor(this.backgroundColor);
    renderer.setFillColor(this.backgroundColor);
    renderer.renderStaticRectangle("center", "100%", "100%");
  }

  setBackground(color: Color) {
    this.backgroundColor = color;
  }

  //#endregion

  // ==========================================================================================
  // #region objects

  addObject(obj: SceneObject): void {
    if (this.objects.includes(obj)) return;

    this.objects.push(obj);
    this.addToMap(obj);

    if (obj instanceof WorldObject) obj.setWorld(this);
  }

  removeObject(obj: SceneObject): SceneObject | undefined {
    const index = this.objects.indexOf(obj);
    this.removeFromMap(obj);

    return this.objects.splice(index, 1)[0];
  }

  findObjects<T extends SceneObject>(clasName: string, exclude?: T | T[]): T[] {
    const objects = this.objectMap.get(clasName);
    if (!objects) return [];

    // copy and work with values
    const values = Util.array.copyOf(objects);

    if (exclude instanceof Object && values?.includes(exclude as T)) {
      Util.array.removeItem(values, exclude as T);
    } else if (exclude instanceof Array) {
      for (let ex of exclude) {
        Util.array.removeItem(values, ex);
      }
    }

    return values as Array<T>;
  }

  //#endregion

  // ==========================================================================================
  // #region map

  // sorted Objects after class: <className, [Objects]>
  private objectMap: Map<string, SceneObject[]> = new Map();

  private addToMap(obj: SceneObject): void {
    let values: SceneObject[] = [];

    const arr = this.objectMap.get(obj.constructor.name);
    if (arr) values = values.concat(arr);

    values.push(obj);

    this.objectMap.set(obj.constructor.name, values);
  }

  private removeFromMap(obj: SceneObject): void {
    const values = this.objectMap.get(obj.constructor.name);
    if (!values) return;

    Util.array.removeItem(values, obj);
  }

  //#endregion

  // ==========================================================================================
  // #region chunks

  private chunkSize: number = 100;
  // private chunks: Map<Vector2, WorldObject<HitBox>[]> = new Map();
  private chunks: TwoKeyMap<number, number, Chunk> = new TwoKeyMap();

  putObjectsInCuncks(): void {
    this.chunks.clear();

    for (let obj of this.objects) {
      if (obj instanceof WorldObject) this.addToChunks(obj);
    }
  }

  addToChunks(obj: WorldObject<HitBox>): void {
    const chunk = this.findChunkOf(obj);
    this.addToChunk(chunk.x, chunk.y, obj);
  }

  // adds Object at specific chunk
  addToChunk(x: number, y: number, obj: WorldObject<HitBox>): void {
    let content = this.chunks.get(x, y);

    if (!(content instanceof Chunk)) {
      content = new Chunk(obj);
      this.chunks.set(x, y, content);
      content.setKeys(x, y);
    }

    content.addObject(obj);
    obj.setChunk(content);
  }

  findChunkOf(obj: WorldObject<HitBox>): Vector2 {
    return new Vector2(
      Math.floor(obj.pos.x / this.chunkSize),
      Math.floor(obj.pos.y / this.chunkSize)
    );
  }

  findNeighbourChunksOf(chunk: Chunk, distance: number = 1, rectangleStlye = true): Chunk[] {
    if (!rectangleStlye) {
      console.warn("Circle Style not implemented!");
      return [];
    }

    const found: Chunk[] = [];

    for (let x = -distance + chunk.keys.x; x <= distance + chunk.keys.x; x++) {
      for (let y = -distance + chunk.keys.y; y <= distance + chunk.keys.y; y++) {
        const chunk = this.chunks.get(x, y);
        if (!chunk) continue;
        found.push(chunk);
      }
    }

    return found;
  }

  getChunk(x: number, y: number): Chunk | undefined {
    return this.chunks.get(x, y);
  }

  setChunkSize(size: number) {
    this.chunkSize = size;
  }

  //#endregion
}
