import GridWorld from "../../../../lib/assets/worlds/GridWorld.js";
import { Color } from "../../../../lib/util/Color.js";
export default class TetrisGrid extends GridWorld {
    render(renderer) {
        renderer.setStrokeColor(Color.get("white"));
        renderer.setLineWidth(1.5);
        super.render(renderer);
    }
}
