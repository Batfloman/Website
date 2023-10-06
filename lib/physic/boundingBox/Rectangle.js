"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = void 0;
const Vector2_js_1 = require("../../util/Vector2.js");
const Polygon2_js_1 = require("./Polygon2.js");
class Rectangle extends Polygon2_js_1.Polygon2 {
    constructor(width, height) {
        let model = [
            new Vector2_js_1.Vector2(0, 0),
            new Vector2_js_1.Vector2(0, height),
            new Vector2_js_1.Vector2(width, height),
            new Vector2_js_1.Vector2(width, 0),
        ];
        super(model);
        this.width = width;
        this.height = height;
        this.centerModel();
    }
}
exports.Rectangle = Rectangle;
