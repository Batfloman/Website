"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collision = void 0;
const Circle_js_1 = require("../boundingBox/Circle.js");
const CircleCollision_js_1 = require("./CircleCollision.js");
const SAT_js_1 = require("./SAT.js");
const Triangulation_js_1 = require("./Triangulation.js");
class Collision {
    static testCollision(obj1, obj2) {
        [obj1, obj2].forEach((obj) => obj.translatePoints());
        if (obj1.hitBox instanceof Circle_js_1.Circle || obj2.hitBox instanceof Circle_js_1.Circle) {
            return CircleCollision_js_1.CircleCollision.potentialCollision(obj1, obj2);
        }
        if (!CircleCollision_js_1.CircleCollision.potentialCollision(obj1, obj2))
            return false;
        if (!obj1.hitBox.isConvex) {
            const parts = Triangulation_js_1.Triangulation.triangulate(obj1);
            for (let part of parts) {
                if (Collision.testCollision(part, obj2))
                    return true;
            }
            return false;
        }
        if (!obj2.hitBox.isConvex) {
            const parts = Triangulation_js_1.Triangulation.triangulate(obj2);
            for (let part of parts) {
                if (Collision.testCollision(obj1, part))
                    return true;
            }
            return false;
        }
        return SAT_js_1.SAT.testCollision(obj1, obj2);
    }
}
exports.Collision = Collision;
