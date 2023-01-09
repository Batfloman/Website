"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Food = void 0;
const WorldObject_js_1 = require("../../../../lib/assets/objects/WorldObject.js");
const Circle_js_1 = require("../../../../lib/physic/boundingBox/Circle.js");
const Color_js_1 = require("../../../../lib/util/Color.js");
const Util_js_1 = require("../../../../lib/util/Util.js");
const minRadius = 10;
const foodScaleFactor = 0.5;
class Food extends WorldObject_js_1.WorldObject {
    constructor(pos, amountFood) {
        super(pos, new Circle_js_1.Circle(Util_js_1.Util.shapes.circle.radius(amountFood) * foodScaleFactor));
        this.amountFood = amountFood;
        this.zIndex = 99;
    }
    update(dt) {
        this.hitBox.radius = Math.max(minRadius, Util_js_1.Util.shapes.circle.radius(this.amountFood) * foodScaleFactor);
        if (this.amountFood > 0)
            return;
        this.game.removeObject(this);
    }
    render(renderer) {
        renderer.setFillColor(Color_js_1.Color.get("green"));
        renderer.setStrokeColor(Color_js_1.Color.get("green"));
        renderer.renderCircle(this.pos, this.hitBox.radius);
    }
}
exports.Food = Food;
