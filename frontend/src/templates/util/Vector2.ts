import Formeln from "../Formeln.js";

export default class Vector2 {
  /** @type {number} */
  x = 0;
  /** @type {number} */
  y = 0;

  constructor(x: number, y: number) {
    this.x = !x ? 0 : x;
    this.y = !y ? 0 : y;
  }

  vectorTo(point: Vector2) {
    return new Vector2(
      Math.round(point.x - this.x),
      Math.round(point.y - this.y)
    )
  }

  getNormal() {
    return new Vector2(
      -this.y,
      this.x
    )
  }

  getMagnitude() {
    return Formeln.calcHypothenuse(this.x, this.y);
  }

  dotProduct(vec2: Vector2) {
    return this.x * vec2.x + this.y * vec2.y;
  }
}