import { GridCell } from "../../../../lib/assets/objects/GridCell.js";
import { Color } from "../../../../lib/util/Color.js";
export class Block extends GridCell {
    constructor() {
        super(...arguments);
        this.color = Color.get("white");
    }
    update2(dt) { }
    render(renderer) {
        renderer.setStrokeColor(Color.none);
        renderer.setFillColor(this.color);
        renderer.renderRectangle(this.getWorldPos(), this.grid.xCellSize, this.grid.yCellSize);
        renderer.setFillColor(new Color(255, 255, 255, 50));
        renderer.renderRectangle(this.getWorldPos(), this.grid.xCellSize / 2, this.grid.yCellSize / 2);
    }
}
