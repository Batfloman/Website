"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vector2_1 = __importDefault(require("../util/Vector2"));
class Camara {
    constructor(canvas) {
        this.resolution = new Vector2_1.default(0, 0);
        this.scale = 1;
    }
}
exports.default = Camara;
