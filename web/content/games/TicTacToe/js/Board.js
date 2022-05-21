import { GridObject } from "../../../lib/assets/Objects/GridObject.js";
import { WorldObject } from "../../../lib/assets/Objects/WorldObject.js";
import { Color } from "../../../lib/util/Color.js";
import Cell from "./Cell.js";
import Input from "../../../lib/input/Input.js";
export default class Board extends GridObject {
    constructor(pos, width, height, xSize, ySize) {
        super(pos, width, height, xSize, ySize);
        Input.newEventListener("click", this, (event) => {
            console.log(event.offsetX, event.offsetY);
        });
    }
    render(renderer) {
        super.render(renderer);
        renderer.setStrokeColor(Color.get("black"));
        renderer.setLineWidth(5);
        renderer.renderGrid(this.pos, this.xSize, this.ySize, this.xCellSize, this.yCellSize);
    }
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
