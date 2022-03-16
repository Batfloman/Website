export default class Vector2 {
  /** @type {number} */
  x = 0;
  /** @type {number} */
  y = 0;

  constructor(x, y) {
    this.x = !x ? 0 : x;
    this.y = !y ? 0 : y;
  }
}