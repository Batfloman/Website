export class Vector3 {
  x: number;
  y: number;
  z: number;

  constructor(x?: number, y?: number, z?: number) {
    this.x = x ?? 0;
    this.y = y ?? 0;
    this.z = z ?? 0;
  }

  add(vec: Vector3): Vector3 {
    return new Vector3(this.x + vec.x, this.y + vec.y, this.z + vec.z);
  }

  subtract(vec: Vector3): Vector3 {
    return new Vector3(this.x - vec.x, this.y - vec.y, this.z - vec.z);
  }

  scale(scalar: number): Vector3 {
    return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
  }

  dotProduct(vec: Vector3): number {
    return this.x * vec.x + this.y * vec.y + this.z * vec.z;
  }

  crossProduct(vec: Vector3): Vector3 {
    return new Vector3(
      this.y * vec.z - this.z * vec.y,
      this.z * vec.x - this.x * vec.z,
      this.x * vec.y - this.y * vec.x
    );
  }

  vectorTo(point: Vector3): Vector3 {
    return new Vector3(point.x - this.x, point.y - this.y, point.z - this.z);
  }

  getMagnitude(): number {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
  }
}
