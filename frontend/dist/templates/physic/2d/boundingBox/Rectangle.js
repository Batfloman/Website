"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vector2_1 = __importDefault(require("../../../util/Vector2"));
const Polygon_1 = __importDefault(require("./Polygon"));
class Rectangle extends Polygon_1.default {
    constructor(width, height) {
        let model = new Array();
        width = !width ? 10 : width;
        height = !height ? 10 : height;
        model.push(new Vector2_1.default(width / 2, height / 2));
        model.push(new Vector2_1.default(width / 2, -height / 2));
        model.push(new Vector2_1.default(-width / 2, -height / 2));
        model.push(new Vector2_1.default(-width / 2, height / 2));
        super(model);
    }
}
exports.default = Rectangle;
