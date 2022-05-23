import { SceneObject } from "./../Objects/SceneObject.js";
import Vector2 from "../../util/Vector2.js";
import Util from "../../util/Util.js";
import IRenderable from "../../display/IRenderable.js";
import Renderer from "../../display/Renderer.js";
import { Color } from "../../util/Color.js";

export default class World implements IRenderable {
  objects: SceneObject[] = [];
  
  // style
  backgroundColor: Color;

  // sorted Objects after class: <className, [Objects]>
  private objectMap: Map<string, SceneObject[]> = new Map();

  constructor() {
    this.backgroundColor = Color.get("white");
  }

  isInsideWorld(point: Vector2): boolean {
    // this World is infinit
    return true;
  }

  // ==========================================================================================
  // render

  shouldRender(): boolean {
    return true;
  }

  render(renderer: Renderer): void {
    renderer.setStrokeColor(this.backgroundColor);
    renderer.setFillColor(this.backgroundColor);
    renderer.renderStaticRectangle("center", "100%", "100%");
  }

  // ==========================================================================================
  //#region manage Objects

  addObject(obj: SceneObject): void {
    if (this.objects.includes(obj)) return;

    this.objects.push(obj);
    this.addToMap(obj);
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
  //#region handle map

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
}
