import { GridObject } from "../../../lib/assets/GridObject.js";
import { WorldObject } from "../../../lib/assets/WorldObject.js";
import Cell from "./Cell.js";
export default class Board extends GridObject {
    renderCell(x, y, renderer) {
        const content = this.grid.get(x, y);
        if (content instanceof WorldObject) {
            content.render(renderer);
        }
        if (typeof content == "string") {
            renderer.renderText(this.pos, content);
        }
    }
    updateCell(x, y, dt) {
        const content = this.grid.get(x, y);
        if (!(content instanceof WorldObject))
            return;
        content.update(dt);
    }
    setCell(x, y, to) {
        if (to instanceof Cell)
            to.init(this.game, this.canvas);
        this.grid.set(x, y, to);
    }
}
