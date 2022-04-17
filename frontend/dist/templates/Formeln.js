"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vector2_1 = __importDefault(require("./util/Vector2"));
class Formeln {
    static calcHypothenuse(side1, side2) {
        return Math.sqrt((Math.pow(side1, 2) + Math.pow(side2, 2)));
    }
    static distance(point1, point2) {
        return Formeln.calcHypothenuse(point1.x - point2.x, point1.y - point2.y);
    }
    static closestPoint(mainPoint, points, exclude) {
        let closest = new Vector2_1.default(Infinity, Infinity);
        let closestDistance = Infinity;
        points.forEach(point => {
            if (mainPoint == point)
                return;
            if (exclude instanceof Vector2_1.default && point == exclude)
                return;
            if (exclude instanceof Array && exclude.includes(point))
                return;
            let distance = Formeln.distance(mainPoint, point);
            if (!closest || !closestDistance || distance < closestDistance) {
                closest = point;
                closestDistance = distance;
            }
        });
        return closest;
    }
    static farthestPoint(mainPoint, points, exclude) {
        let farthest = mainPoint;
        let farthestDistance = 0;
        points.forEach(point => {
            if (mainPoint == point)
                return;
            if (exclude instanceof Vector2_1.default && point == exclude)
                return;
            if (exclude instanceof Array && exclude.includes(point))
                return;
            let distance = Formeln.distance(mainPoint, point);
            if (!farthest || !farthestDistance || distance > farthestDistance) {
                farthest = point;
                farthestDistance = distance;
            }
        });
        return farthest;
    }
    static moveDirection(start, direction, distance) {
        let moveX = Math.sin(Formeln.toRadian(direction)) * distance;
        let moveY = -Math.cos(Formeln.toRadian(direction)) * distance;
        return new Vector2_1.default(start.x + moveX, start.y + moveY);
    }
    static rotateAroundCenter(center, point, angle) {
        let xRotated = Math.cos(Formeln.toRadian(angle)) * (point.x - center.x) - Math.sin(Formeln.toRadian(angle)) * (point.y - center.y) + center.x;
        let yRotated = Math.sin(Formeln.toRadian(angle)) * (point.x - center.x) + Math.cos(Formeln.toRadian(angle)) * (point.y - center.y) + center.y;
        return new Vector2_1.default(xRotated, yRotated);
    }
    static toRadian(degree) {
        return degree * Math.PI / 180;
    }
}
exports.default = Formeln;
