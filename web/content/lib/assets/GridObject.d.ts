import { SceneObject } from "./SceneObject.js";
import Matrix2 from "../util/Matrix2.js";
export declare abstract class GridObject<T> extends SceneObject {
    grid: Matrix2<T>;
    constructor(xSize: number, ySize: number);
}
