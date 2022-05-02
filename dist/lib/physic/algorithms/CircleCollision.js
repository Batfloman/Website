import Util from "../../util/Util.js";
export default class CircleCollision {
    static potentialCollision(obj1, obj2) {
        [obj1, obj2].forEach((obj) => obj.translatePoints());
        let centerDistance = Util.distance(obj1.pos, obj2.pos);
        let furthest1 = Util.distance(obj1.pos, Util.farthestPoint(obj1.pos, obj1.translatePoints()));
        let furthest2 = Util.distance(obj2.pos, Util.farthestPoint(obj2.pos, obj2.translatePoints()));
        let collision = centerDistance < furthest1 + furthest2;
        return collision;
    }
}
