import { GridWorld } from "../../../lib/assets/worlds/GridWorld.js";
import { Color } from "../../../lib/util/Color.js";
import { Input } from "../../../lib/input/Input.js";
export class Board extends GridWorld {
    constructor(canvas, xSize, ySize) {
        super(canvas.width, canvas.height, xSize, ySize);
        this.canvas = canvas;
        Input.newEventListener("resize", this, () => {
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this.xCellSize = this.width / this.xSize;
            this.yCellSize = this.height / this.ySize;
        });
    }
    render(renderer) {
        renderer.setStrokeColor(Color.get("black"));
        super.render(renderer);
    }
}
