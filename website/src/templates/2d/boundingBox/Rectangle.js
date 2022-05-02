"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vector2_js_1 = __importDefault(require("../../util/Vector2.js"));
const Polygon2_js_1 = __importDefault(require("./Polygon2.js"));
class Rectangle extends Polygon2_js_1.default {
    constructor(width, height, startAngle) {
        let model = new Array();
        width = !width ? 10 : width;
        height = !height ? 10 : height;
        model.push(new Vector2_js_1.default(0, 0));
        model.push(new Vector2_js_1.default(0, height));
        model.push(new Vector2_js_1.default(width, height));
        model.push(new Vector2_js_1.default(width, 0));
        super(model, startAngle);
        this.centerModel();
    }
}
exports.default = Rectangle;
