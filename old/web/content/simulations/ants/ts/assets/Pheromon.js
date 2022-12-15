"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pheromon = void 0;
const WorldObject_js_1 = require("../../../../lib/assets/objects/WorldObject.js");
const Circle_js_1 = require("../../../../lib/physic/boundingBox/Circle.js");
const Color_js_1 = require("../../../../lib/util/Color.js");
const pheromonSize = 0.5;
const duration = 35000;
const colors = new Map([
    ["home", Color_js_1.Color.get("red")],
    ["food", Color_js_1.Color.get("blue")],
]);
class Pheromon extends WorldObject_js_1.WorldObject {
    constructor(pos, message) {
        super(pos, new Circle_js_1.Circle(pheromonSize));
        this.hiveId = 0;
        this.message = message;
        this.strength = 100;
        if (message == "home")
            this.zIndex = 5;
        if (message == "food")
            this.zIndex = 10;
        const color = colors.get(this.message);
        this.color = !color ? Color_js_1.Color.get("red") : color;
    }
    update(dt) {
        this.strength -= dt * (100 / duration);
        if (this.strength <= 0) {
            this.game.removeObject(this);
        }
    }
    render(renderer) {
        var _a;
        (_a = this.color) === null || _a === void 0 ? void 0 : _a.setA(this.strength);
        renderer.setStrokeColor(this.color);
        renderer.setFillColor(this.color);
        renderer.renderRectangle(this.pos, pheromonSize * 2, pheromonSize * 2);
    }
    setColor(color) {
        this.color = color;
    }
    setHiveId(num) {
        this.hiveId = num;
    }
}
exports.Pheromon = Pheromon;
