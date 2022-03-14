export default class Vector {
  x = 0;
  y = 0;

  constructor(x, y) {
    this.x = !x ? 0 : x;
    this.y = !y ? 0 : y;
  }
}