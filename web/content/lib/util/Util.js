import Polygon2Helper from "../physic/algorithms/Polygon2Helper.js";
import Vector2 from "./Vector2.js";
export default class Util {
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
        const rad = Util.math.toRadian(direction);
        const moveX = Math.sin(rad) * distance;
        const moveY = Math.cos(rad) * distance;
        return new Vector2(start.x + moveX, start.y + moveY);
    }
    static rotateAroundCenter(center, point, angle) {
        const rad = Util.math.toRadian(angle);
        const xRotated = Math.cos(rad) * (point.x - center.x) - Math.sin(rad) * (point.y - center.y) + center.x;
        const yRotated = Math.sin(rad) * (point.x - center.x) + Math.cos(rad) * (point.y - center.y) + center.y;
        return new Vector2(xRotated, yRotated);
    }
}
Util.array = {
    getItem(arr, index) {
        if (index < 0)
            index = arr.length - 1;
        return arr[index % arr.length];
    },
    getLastItem(arr) {
        return arr[arr.length - 1];
    },
    getRandomItem(arr) {
        return Util.array.getItem(arr, Util.math.randomBetween(0, arr.length - 1));
    },
    removeItemAtIndex(arr, index) {
        if (index < 0 || index >= arr.length)
            throw new Error(`${index} is not Valid!`);
        return arr.splice(index, 1)[0];
    },
    removeItem(arr, item) {
        if (arr.includes(item)) {
            return arr.splice(arr.indexOf(item), 1)[0];
        }
        return null;
    },
};
Util.math = {
    randomBetween(start, end, num_decimals = 0) {
        return Util.math.round(Math.random() * (end - start) + start, num_decimals);
    },
    round(number, num_decimals = 0) {
        return Math.round(number * Math.pow(10, num_decimals)) / Math.pow(10, num_decimals);
    },
    floor(number, num_decimals = 0) {
        return Math.floor(number * Math.pow(10, num_decimals)) / Math.pow(10, num_decimals);
    },
    toRadian(degree) {
        return (degree * Math.PI) / 180;
    }
};
Util.shapes = {
    cricle: {
        area(radius) {
            return Math.PI * Math.pow(radius, 2);
        },
    },
    polygon: {
        area(polygon) {
            return Polygon2Helper.findArea(polygon);
        }
    }
};
