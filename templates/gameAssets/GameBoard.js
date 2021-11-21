import Vector2f from "../util/Vector2f.js";
import GridObject from "./GridObject.js";

export default class GameBoard extends GridObject {
    constructor(x, y) {
        super(
            new Vector2f(x, y),
            new Vector2f(100, 100),
            new Vector2f(0, 0)
        )
    }
}