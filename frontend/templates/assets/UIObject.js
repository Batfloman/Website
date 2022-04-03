import SceneObject from "./SceneObject.js";
import Vector2 from "../util/Vector2.js";
import WorldObject from "./WorldObject.js";
import Polygon from "../physic/2d/boundingBox/Polygon.js";
import Rectangle from "../physic/2d/boundingBox/Rectangle.js";

export default class UIObject extends WorldObject {
  /** @type {Vector2} */
  staticPos;
  /** @type {} */
  hitBox

  constructor(pos, hitBox) {
    this.staticPos = !pos || !(pos instanceof Vector2) ? new Vector2(0,0) : pos;
    this.hitBox = !hitBox || !(hitBox instanceof Polygon) ? new Rectangle(50, 50) : hitBox;
  }

  update() {};

  render() {};
}