"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Formeln2_js_1 = __importDefault(require("../2d/Formeln2.js"));
class Vector2 {
    constructor(x, y) {
        this.x = 0;
        this.y = 0;
        this.x = !x ? 0 : x;
        this.y = !y ? 0 : y;
    }
    add(vec2) {
        return new Vector2(this.x + vec2.x, this.y + vec2.y);
    }
    subtract(vec2) {
        return new Vector2(this.x - vec2.x, this.y - vec2.y);
    }
    scale(scalar) {
        return new Vector2(this.x * scalar, this.y * scalar);
    }
    dotProduct(vec2) {
        return (this.x * vec2.x) + (this.y * vec2.y);
    }
    skalarProdukt(vec2) {
        return (this.x * vec2.x) + (this.y * vec2.y);
    }
    crossProduct(vec2) {
        return (this.x * vec2.y) - (vec2.x * this.y);
    }
    vectorTo(point) {
        return new Vector2(Math.round(point.x - this.x), Math.round(point.y - this.y));
    }
    getNormal() {
        return new Vector2(-this.y, this.x);
    }
    getMagnitude() {
        return Formeln2_js_1.default.calcHypothenuse(this.x, this.y);
    }
    getLänge() {
        return Formeln2_js_1.default.calcHypothenuse(this.x, this.y);
    }
}
exports.default = Vector2;
