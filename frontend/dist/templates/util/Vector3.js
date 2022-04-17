"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Vector3 {
    constructor(x, y, z) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.x = !x ? 0 : x;
        this.y = !y ? 0 : y;
        this.z = !z ? 0 : z;
    }
}
exports.default = Vector3;
