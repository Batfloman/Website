import GridWorld from "../../../../lib/assets/Worlds/GridWorld.js";
import Renderer from "../../../../lib/display/Renderer.js";
import { Color } from "../../../../lib/util/Color.js";
import Vector2 from "../../../../lib/util/Vector2.js";

export default class TetrisGrid extends GridWorld {
  render(renderer: Renderer): void {
    renderer.setStrokeColor(Color.get("white"));
    renderer.setLineWidth(1.5);
    super.render(renderer);

    // TODO why TF doesn't clear 
  }
}