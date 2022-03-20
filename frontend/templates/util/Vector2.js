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
    return Math.sqrt( 
      Math.pow(this.x, 2),
      Math.pow(this.y, 2)
    )
  }

  dotProduct(vec2) {
    return this.x * vec2.x + this.y * vec2.y;
  }
}