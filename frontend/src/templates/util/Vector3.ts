export default class Vector3 {
  x: number = 0;
  y: number = 0;
  z: number = 0;

  constructor(x: number, y: number, z: number) {
    this.x = !x ? 0 : x;
    this.y = !y ? 0 : y;
    this.z = !z ? 0 : z;
  }
}