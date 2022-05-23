import GridWorld from "../../../../lib/assets/Worlds/GridWorld.js";
import { Color } from "../../../../lib/util/Color.js";
import Input from "../../../../lib/input/Input.js";
export default class TicTacToeGrid extends GridWorld {
    constructor(canvas, xSize, ySize) {
        super(canvas.width, canvas.height, xSize, ySize);
        this.canvas = canvas;
        Input.newEventListener("resize", this, () => {
            console.log(this);
            this.width = this.canvas.width;
            this.height = this.canvas.height;
        });
    }
    render(renderer) {
        renderer.setStrokeColor(Color.get("black"));
        super.render(renderer);
    }
}
