import { GridCell } from "../../../../lib/assets/objects/GridCell.js";
import Rectangle from "../../../../lib/physic/boundingBox/Rectangle.js";
import Vector2 from "../../../../lib/util/Vector2.js";
export default class Block extends GridCell {
    constructor() {
        super(new Vector2(), new Rectangle(0, 0), 0);
    }
    update2(dt) {
    }
    render(renderer) {
    }
}
