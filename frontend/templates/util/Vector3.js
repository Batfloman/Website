export default class Vector3 {
   /** @type {number} */
  x = 0;
   /** @type {number} */
  y = 0;
   /** @type {number} */
  z = 0;

  constructor(x, y, z) {
    this.x = !x ? 0 : x;
    this.y = !y ? 0 : y;
    this.z = !z ? 0 : z;
  }
}