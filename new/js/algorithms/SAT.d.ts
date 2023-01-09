import { ICollideable } from "../physic/properties/ICollideable.js";
export declare class SAT {
    static testCollision(obj1: ICollideable, obj2: ICollideable): boolean;
    /**
     * Tests all Sides of polygon 1 with SAT agaings polygon 2
     * Returns false if a gap is found - else true
     */
    private static areColliding;
}
