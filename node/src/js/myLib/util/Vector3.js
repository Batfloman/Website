export class Vector3 {
    x;
    y;
    z;
    constructor(x, y, z) {
        this.x = x ?? 0;
        this.y = y ?? 0;
        this.z = z ?? 0;
    }
    add(vec) {
        return new Vector3(this.x + vec.x, this.y + vec.y, this.z + vec.z);
    }
    subtract(vec) {
        return new Vector3(this.x - vec.x, this.y - vec.y, this.z - vec.z);
    }
    scale(scalar) {
        return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
    }
    dotProduct(vec) {
        return this.x * vec.x + this.y * vec.y + this.z * vec.z;
    }
    crossProduct(vec) {
        return new Vector3(this.y * vec.z - this.z * vec.y, this.z * vec.x - this.x * vec.z, this.x * vec.y - this.y * vec.x);
    }
    vectorTo(point) {
        return new Vector3(point.x - this.x, point.y - this.y, point.z - this.z);
    }
    getMagnitude() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
    }
}
