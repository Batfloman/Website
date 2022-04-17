"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Formeln_1 = __importDefault(require("../Formeln"));
class Vector2 {
    constructor(x, y) {
        this.x = 0;
        this.y = 0;
        this.x = !x ? 0 : x;
        this.y = !y ? 0 : y;
    }
    vectorTo(point) {
        return new Vector2(Math.round(point.x - this.x), Math.round(point.y - this.y));
    }
    getNormal() {
        return new Vector2(-this.y, this.x);
    }
    getMagnitude() {
        return Formeln_1.default.calcHypothenuse(this.x, this.y);
    }
    dotProduct(vec2) {
        return this.x * vec2.x + this.y * vec2.y;
    }
}
exports.default = Vector2;
