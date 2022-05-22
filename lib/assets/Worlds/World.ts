import { SceneObject } from "./../Objects/SceneObject.js";
import Vector2 from "../../util/Vector2.js";
import Util from "../../util/Util.js";

export default class World {
  objects: SceneObject[] = [];

  private objectMap: Map<string, SceneObject[]> = new Map();

  isInsideWorld(point: Vector2): boolean {
    return true;
  }

  // ==========================================================================================
  // manage Objects

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
    const values = this.objectMap.get(clasName);
    if(!values) return [];
    return values as Array<T>;
  }

  // ==========================================================================================
  // handle map
  private addToMap(obj: SceneObject): void {
    let values: SceneObject[] = [];

    const arr = this.objectMap.get(obj.constructor.name);
    if(arr) values = values.concat(arr);
    
    values.push(obj);

    this.objectMap.set(obj.constructor.name, values);
  }

  private removeFromMap(obj: SceneObject): void {
    const values = this.objectMap.get(obj.constructor.name);
    if(!values) return;

    Util.array.removeItem(values, obj);
  }
}
