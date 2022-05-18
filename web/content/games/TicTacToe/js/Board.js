import { GridObject } from "../../../lib/assets/GridObject.js";
import { WorldObject } from "../../../lib/assets/WorldObject.js";
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
    update2(dt) {
        throw new Error("Method not implemented.");
    }
}
