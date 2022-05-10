import Vector2 from "../../util/Vector2.js";
export default class Polygon2 {
    model: Vector2[];
    angle: number;
    isConvex: boolean;
    constructor(model: Vector2[], startAngle?: number);
    centerModel(): void;
    findCenter(): Vector2;
}
