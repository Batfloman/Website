import { SceneObject } from "./SceneObject.js";
import Matrix2 from "../util/Matrix2.js";
export class GridObject extends SceneObject {
    constructor(xSize, ySize) {
        super();
        this.grid = new Matrix2(xSize, ySize);
    }
}
