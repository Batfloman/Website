import Util from "../../util/Util.js";
export default class CircleCollision {
    static potentialCollision(obj1, obj2) {
        [obj1, obj2].forEach((obj) => obj.translatePoints());
        return this.circleCollision(obj1.pos, obj1.hitBox.farthestPoint.getMagnitude(), obj2.pos, obj2.hitBox.farthestPoint.getMagnitude());
    }
    static circleCollision(c1, r1, c2, r2) {
        return Util.distance(c1, c2) < r1 + r2;
    }
}
