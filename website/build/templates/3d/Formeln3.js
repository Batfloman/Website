import Vector3 from "../util/Vector3.js";
import Formeln2 from "../2d/Formeln2.js";
import Vector2 from "../util/Vector2.js";
export default class Formeln3 {
    static calcHypothenuse(side1, side2, side3) {
        return Math.sqrt((Math.pow(side1, 2) + Math.pow(side2, 2) + Math.pow(side3, 2)));
    }
    static distance(point1, point2) {
        return Formeln3.calcHypothenuse(point1.x - point2.x, point1.y - point2.y, point1.z - point2.z);
    }
    static closestPoint(mainPoint, points, exclude) {
        let closest = new Vector3(Infinity, Infinity, Infinity);
        let closestDistance = Infinity;
        points.forEach(point => {
            if (mainPoint == point)
                return;
            if (exclude instanceof Vector3 && point == exclude)
                return;
            if (exclude instanceof Array && exclude.includes(point))
                return;
            let distance = Formeln3.distance(mainPoint, point);
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
            if (exclude instanceof Vector3 && point == exclude)
                return;
            if (exclude instanceof Array && exclude.includes(point))
                return;
            let distance = Formeln3.distance(mainPoint, point);
            if (!farthest || !farthestDistance || distance > farthestDistance) {
                farthest = point;
                farthestDistance = distance;
            }
        });
        return farthest;
    }
    static moveDirection(start, movement) {
        return new Vector3(start.x + movement.x, start.y + movement.y, start.z + movement.z);
    }
    static rotateAroundCenter(center, point, angle) {
        let rotateX = Formeln2.rotateAroundCenter(new Vector2(center.x, center.y), new Vector2(point.x, point.y), angle.x);
        point = new Vector3(rotateX.x, rotateX.y, point.z);
        let rotateY = Formeln2.rotateAroundCenter(new Vector2(center.y, center.z), new Vector2(point.y, point.z), angle.y);
        point = new Vector3(point.x, rotateY.x, rotateY.y);
        let rotateZ = Formeln2.rotateAroundCenter(new Vector2(center.z, center.x), new Vector2(point.z, point.x), angle.z);
        point = new Vector3(rotateZ.y, point.y, rotateZ.x);
        return point;
    }
}
