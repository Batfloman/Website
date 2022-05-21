import { GridObject } from "../../../lib/assets/Objects/GridObject.js";
import { Color } from "../../../lib/util/Color.js";
export default class TetrisGrid extends GridObject {
    renderCell(x, y, renderer) {
    }
    updateCell(x, y, dt) {
    }
    render(renderer) {
        super.render(renderer);
        renderer.setStrokeColor(new Color(232, 232, 232));
        renderer.setLineWidth(1.5);
        renderer.renderGrid(this.pos, this.xSize, this.ySize, this.xCellSize, this.yCellSize);
    }
}
