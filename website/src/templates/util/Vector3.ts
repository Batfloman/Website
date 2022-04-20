export default class Vector3 {
  x: number;
  y: number;
  z: number;

  constructor(x?: number, y?: number, z?: number) {
    this.x = !x ? 0 : x;
    this.y = !y ? 0 : y;
    this.z = !z ? 0 : z;
  }

  add(vec3: Vector3): Vector3 {
    return new Vector3(
      this.x + vec3.x,
      this.y + vec3.y,
      this.z + vec3.z
    )
  }

  subtract(vec3: Vector3): Vector3 {
    return new Vector3(
      this.x - vec3.x,
      this.y - vec3.y,
      this.z - vec3.z
    )
  }

  vectorTo(point: Vector3): Vector3 {
    return new Vector3(
      Math.round(point.x - this.x),
      Math.round(point.y - this.y),
      Math.round(point.z - this.z)
    )
  }

  getMagnitude(): number {
    return Math.sqrt( Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
  }
}