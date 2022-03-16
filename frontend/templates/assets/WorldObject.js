import SceneObject from "./SceneObject.js";
import Polygon from "../physic/2d/boundingBox/Polygon.js";
import Vector2 from "../util/Vector2.js";

export default class WorldObject extends SceneObject {
  /** @type {Vector2} */
  centerPos;
  /** @type {Polygon} */
  hitBox;

  constructor(centerPos, hitBox) {
    super();

    if(!(centerPos instanceof Vector2)) throw new Error(`${centerPos} is supposed to be instanceof Vector2`);
    if(!(hitBox instanceof Polygon)) throw new Error(`${hitBox} is supposed to be instanceof Polygon`);

    this.centerPos = centerPos;
    this.hitBox = hitBox;
  }

  update() {
    // this.rotate(1)
  }

  render(ctx) {
    let pos = new Vector2(
      this.centerPos.x - this.canvas.viewOffSet.x,
      this.centerPos.y - this.canvas.viewOffSet.y
    )
    this.hitBox.render(ctx, pos);
  }

  isOnScreen() {
    let screenLeftX = this.canvas.viewOffSet.x;
    let screenRightX = this.canvas.viewOffSet.x + this.canvas.htmlCanvas.width ;
    let screenTopY = this.canvas.viewOffSet.y + this.canvas.htmlCanvas.height;
    let screenBottomY = this.canvas.viewOffSet.y;

    let isInRangeX = (screenLeftX < this.centerPos.x) && (this.centerPos.x < screenRightX);
    let isInRangeY = (screenBottomY < this.centerPos.y) && (this.centerPos.y < screenTopY);

    return (isInRangeX && isInRangeY);
  }

  rotate(degree) {
    this.hitBox.rotate(degree);
  }
}