import Vector2 from "../../util/Vector2";
import World from "./World";

export default class RechtangleWorld extends World {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    super();

    this.width = width;
    this.height = height;
  }

  isInsideWorld(point: Vector2): boolean {
    const rightX = point.x > -this.width/2 && point.x < this.width / 2;
    const rightY = point.y > -this.height/2 && point.y < this.width / 2;

    return rightX && rightY;
  }
}