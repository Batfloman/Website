export default class Vector3 {
  x = 0;
  y = 0;
  z = 0;

  constructor(x: number, y: number, z: number) {
    this.x = !x ? 0 : x;
    this.y = !y ? 0 : y;
    this.z = !z ? 0 : z;
  }
}