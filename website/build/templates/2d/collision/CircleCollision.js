import Formeln2 from "../Formeln2.js";
export default class CircleCollision {
    static potentialCollision(obj1, obj2) {
        [obj1, obj2].forEach(obj => obj.translatePoints());
        let centerDistance = Formeln2.distance(obj1.pos, obj2.pos);
        let furthest1 = Formeln2.distance(obj1.pos, Formeln2.farthestPoint(obj1.pos, obj1.translatePoints()));
        let furthest2 = Formeln2.distance(obj2.pos, Formeln2.farthestPoint(obj2.pos, obj2.translatePoints()));
        let collision = (centerDistance < (furthest1 + furthest2));
        return collision;
    }
}
