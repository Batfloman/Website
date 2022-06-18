import { GridCell } from "../../../../lib/assets/objects/GridCell.js";
import { Color } from "../../../../lib/util/Color.js";
export class TSymbol extends GridCell {
    constructor(text, grid, gridPos) {
        super(grid, gridPos);
        this.text = text;
    }
    update(dt) { }
    render(renderer) {
        renderer.setFillColor(Color.get("black"));
        renderer.renderText(this.pos, this.text);
    }
}
