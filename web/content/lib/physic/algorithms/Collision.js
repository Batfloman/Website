import CircleCollision from "./CircleCollision.js";
import SAT from "./SAT.js";
import Triangulation from "./Triangulation.js";
export default class Collision {
    static testCollision(obj1, obj2) {
        if (!CircleCollision.potentialCollision(obj1, obj2))
            return false;
        if (obj1.hitBox.isConvex) {
            if (obj2.hitBox.isConvex) {
                return SAT.testCollision(obj1, obj2);
            }
            else {
                let collides = false;
                return collides;
            }
        }
        else {
            let collides = false;
            let parts = Triangulation.triangulate(obj1);
            for (let part of parts) {
            }
        }
        return false;
    }
}
