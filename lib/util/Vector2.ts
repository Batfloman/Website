export default class Vector2 {
  x: number;
  y: number;

  constructor(x?: number, y?: number) {
    this.x = !x ? 0 : x;
    this.y = !y ? 0 : y;
  }

  add(vec2: Vector2) {
    return new Vector2(this.x + vec2.x, this.y + vec2.y);
  }

  subtract(vec2: Vector2) {
    return new Vector2(this.x - vec2.x, this.y - vec2.y);
  }

  scale(scalar: number) {
    return new Vector2(this.x * scalar, this.y * scalar);
  }

  dotProduct(vec2: Vector2): number {
    return this.x * vec2.x + this.y * vec2.y;
  }

  skalarProdukt(vec2: Vector2): number {
    return this.x * vec2.x + this.y * vec2.y;
  }

  crossProduct(vec2: Vector2): number {
    return this.x * vec2.y - vec2.x * this.y;
  }

  vectorTo(point: Vector2): Vector2 {
    return new Vector2(
      Math.round(point.x - this.x),
      Math.round(point.y - this.y)
    );
  }

  getNormal(): Vector2 {
    return new Vector2(-this.y, this.x);
  }

  getMagnitude(): number {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }
}
