import Formeln from "../Formeln.js";

export default class Vector2 {
  /** @type {number} */
  x = 0;
  /** @type {number} */
  y = 0;

  constructor(x, y) {
    this.x = !x ? 0 : x;
    this.y = !y ? 0 : y;
  }

  vectorTo(point) {
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
    return Formeln.calcHypotenuse(this.x, this.y);
  }

  dotProduct(vec2) {
    return this.x * vec2.x + this.y * vec2.y;
  }
}