import Vector2 from "./Vector2.js";
export default class Util {
    static getItem(arr, index) {
        if (index < 0)
            index = arr.length - 1;
        return arr[index % arr.length];
    }
    static getLastItem(arr) {
        return arr[arr.length - 1];
    }
    static getRandomItem(arr) {
        return Util.getItem(arr, Util.randomBetween(0, arr.length - 1));
    }
    static removeItemAtIndex(arr, index) {
        if (index < 0 || index >= arr.length)
            throw new Error(`${index} is not Valid!`);
        return arr.splice(index, 1)[0];
    }
    static removeItem(arr, item) {
        if (arr.includes(item)) {
            return arr.splice(arr.indexOf(item), 1)[0];
        }
        return null;
    }
    static randomBetween(start, end, decimals = 0) {
        return Util.round((Math.random() * (end - start) + start), decimals);
    }
    static round(number, decimals = 0) {
        return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
    }
    static calcHypothenuse(side1, side2) {
        return Math.sqrt(Math.pow(side1, 2) + Math.pow(side2, 2));
    }
    static distance(point1, point2) {
        return Util.calcHypothenuse(point1.x - point2.x, point1.y - point2.y);
    }
    static closestPoint(mainPoint, points, exclude) {
        let closest = new Vector2(Infinity, Infinity);
        let closestDistance = Infinity;
        points.forEach((point) => {
            if (mainPoint == point)
                return;
            if (exclude instanceof Vector2 && point == exclude)
                return;
            if (exclude instanceof Array && exclude.includes(point))
                return;
            let distance = Util.distance(mainPoint, point);
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
        points.forEach((point) => {
            if (mainPoint == point)
                return;
            if (exclude instanceof Vector2 && point == exclude)
                return;
            if (exclude instanceof Array && exclude.includes(point))
                return;
            let distance = Util.distance(mainPoint, point);
            if (distance >= farthestDistance) {
                farthest = point;
                farthestDistance = distance;
            }
        });
        return farthest;
    }
    static moveDirection(start, direction, distance) {
        let moveX = Math.sin(Util.toRadian(direction)) * distance;
        let moveY = Math.cos(Util.toRadian(direction)) * distance;
        return new Vector2(start.x + moveX, start.y + moveY);
    }
    static rotateAroundCenter(center, point, angle) {
        let xRotated = Math.cos(Util.toRadian(angle)) * (point.x - center.x) -
            Math.sin(Util.toRadian(angle)) * (point.y - center.y) +
            center.x;
        let yRotated = Math.sin(Util.toRadian(angle)) * (point.x - center.x) +
            Math.cos(Util.toRadian(angle)) * (point.y - center.y) +
            center.y;
        return new Vector2(xRotated, yRotated);
    }
    static toRadian(degree) {
        return (degree * Math.PI) / 180;
    }
}
