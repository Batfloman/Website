"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Formeln2_js_1 = __importDefault(require("../Formeln2.js"));
class CircleCollision {
    static potentialCollision(obj1, obj2) {
        [obj1, obj2].forEach(obj => obj.translatePoints());
        let centerDistance = Formeln2_js_1.default.distance(obj1.pos, obj2.pos);
        let furthest1 = Formeln2_js_1.default.distance(obj1.pos, Formeln2_js_1.default.farthestPoint(obj1.pos, obj1.translatePoints()));
        let furthest2 = Formeln2_js_1.default.distance(obj2.pos, Formeln2_js_1.default.farthestPoint(obj2.pos, obj2.translatePoints()));
        let collision = (centerDistance < (furthest1 + furthest2));
        return collision;
    }
}
exports.default = CircleCollision;
