import Vector2 from "../../util/Vector2.js";
export default class Polygon2 {
    model: Vector2[];
    isConvex: boolean;
    farthest: Vector2;
    constructor(model: Vector2[]);
    centerModel(): void;
    findCenter(): Vector2;
}
