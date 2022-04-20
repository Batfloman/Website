import Vector2 from "../util/Vector2.js";
export default class Formeln2 {
    static calcHypothenuse(side1, side2) {
        return Math.sqrt((Math.pow(side1, 2) + Math.pow(side2, 2)));
    }
    static distance(point1, point2) {
        return Formeln2.calcHypothenuse(point1.x - point2.x, point1.y - point2.y);
    }
    static closestPoint(mainPoint, points, exclude) {
        let closest = new Vector2(Infinity, Infinity);
        let closestDistance = Infinity;
        points.forEach(point => {
            if (mainPoint == point)
                return;
            if (exclude instanceof Vector2 && point == exclude)
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
    static farthestPoint(mainPoint, points, exclude) {
        let farthest = mainPoint;
        let farthestDistance = 0;
        points.forEach(point => {
            if (mainPoint == point)
                return;
            if (exclude instanceof Vector2 && point == exclude)
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
    static moveDirection(start, direction, distance) {
        let moveX = Math.sin(Formeln2.toRadian(direction)) * distance;
        let moveY = -Math.cos(Formeln2.toRadian(direction)) * distance;
        return new Vector2(start.x + moveX, start.y + moveY);
    }
    static rotateAroundCenter(center, point, angle) {
        let xRotated = Math.cos(Formeln2.toRadian(angle)) * (point.x - center.x) - Math.sin(Formeln2.toRadian(angle)) * (point.y - center.y) + center.x;
        let yRotated = Math.sin(Formeln2.toRadian(angle)) * (point.x - center.x) + Math.cos(Formeln2.toRadian(angle)) * (point.y - center.y) + center.y;
        return new Vector2(xRotated, yRotated);
    }
    static toRadian(degree) {
        return degree * Math.PI / 180;
    }
}
