"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vector2_js_1 = __importDefault(require("../util/Vector2.js"));
class Formeln2 {
    /**
     * Returns the Hypothenuse of a Triangle
     * @param side1 the lenght of the 1. side
     * @param side2 the lenght of the 2. side
     */
    static calcHypothenuse(side1, side2) {
        return Math.sqrt((Math.pow(side1, 2) + Math.pow(side2, 2)));
    }
    /**
     * Returns the distance between to Points
     * @param point1
     * @param point2
     */
    static distance(point1, point2) {
        return Formeln2.calcHypothenuse(point1.x - point2.x, point1.y - point2.y);
    }
    /**
     * Returns the closest Point to the mainPoint
     * @param mainPoint point from which the distance will be measured
     * @param points collection of Points that will be tested
     * @param exclude point(s) that will be excluded
     */
    static closestPoint(mainPoint, points, exclude) {
        let closest = new Vector2_js_1.default(Infinity, Infinity);
        let closestDistance = Infinity;
        points.forEach(point => {
            if (mainPoint == point)
                return;
            if (exclude instanceof Vector2_js_1.default && point == exclude)
                return;
            if (exclude instanceof Array && exclude.includes(point))
                return;
            let distance = Formeln2.distance(mainPoint, point);
            if (!closest || !closestDistance || distance < closestDistance) {
                closest = point;
                closestDistance = distance;
            }
        });
        return closest;
    }
    /**
     * Returns the farthest Point to the mainPoint
     * @param mainPoint point from which the distance will be measured
     * @param points collection of Points that will be tested
     * @param exclude point(s) that will be excluded
     */
    static farthestPoint(mainPoint, points, exclude) {
        let farthest = mainPoint;
        let farthestDistance = 0;
        points.forEach(point => {
            if (mainPoint == point)
                return;
            if (exclude instanceof Vector2_js_1.default && point == exclude)
                return;
            if (exclude instanceof Array && exclude.includes(point))
                return;
            let distance = Formeln2.distance(mainPoint, point);
            if (!farthest || !farthestDistance || distance > farthestDistance) {
                farthest = point;
                farthestDistance = distance;
            }
        });
        return farthest;
    }
    /**
     * Moves @param distance in @param direction from the @param start Point and returns the new Position
     * @param start point from which the movement starts
     * @param direction angle in which the point will be moved
     * @param distance amount by which the point will be moved
     */
    static moveDirection(start, direction, distance) {
        let moveX = Math.sin(Formeln2.toRadian(direction)) * distance;
        let moveY = -Math.cos(Formeln2.toRadian(direction)) * distance;
        return new Vector2_js_1.default(start.x + moveX, start.y + moveY);
    }
    /**
     * Rotates the @param point around a @param center Point by @param angle degrees
     * @param center point which another point will rotate around
     * @param point point that will be rotated
     * @param angel angle by which the point will be rotated
     */
    static rotateAroundCenter(center, point, angle) {
        let xRotated = Math.cos(Formeln2.toRadian(angle)) * (point.x - center.x) - Math.sin(Formeln2.toRadian(angle)) * (point.y - center.y) + center.x;
        let yRotated = Math.sin(Formeln2.toRadian(angle)) * (point.x - center.x) + Math.cos(Formeln2.toRadian(angle)) * (point.y - center.y) + center.y;
        return new Vector2_js_1.default(xRotated, yRotated);
    }
    /**
     * Retruns the @param degree measured in Radians
     * @param degree angle measured in degree
     */
    static toRadian(degree) {
        return degree * Math.PI / 180;
    }
}
exports.default = Formeln2;
