import GridObject from "../../../../lib/gameAssets/impl/GridObject.js.js";
import Vector2f from "../../../../lib/util/Vector2f.js.js";

export default class Board extends GridObject {

    constructor(x, y) {
        super(
            new Vector2f(x, y),
            new Vector2f(100, 100),
            new Vector2f(0, 0)
        );
    }

    render() {
        super.render();
    }
}