import { ICollideable } from "../property/ICollideable.js";
export declare class Triangulation {
    static triangulate(obj: ICollideable): ICollideable[];
    private static isPointInTriangle;
}
