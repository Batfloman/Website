import { GridCell } from "../../../../lib/assets/objects/GridCell.js";
export class Symbol extends GridCell {
    constructor(text, grid, gridPos) {
        super(grid, gridPos);
        this.text = text;
    }
    update2(dt) { }
    render(renderer) {
        renderer.renderText(this.getWorldPos(), this.text);
    }
}
