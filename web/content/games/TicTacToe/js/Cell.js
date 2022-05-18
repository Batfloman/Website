import { WorldObject } from "../../../lib/assets/WorldObject.js";
export default class Cell extends WorldObject {
    update2(dt) { }
    render(renderer) {
        renderer.renderRectangle(this.pos, this.hitBox.width, this.hitBox.height);
    }
}
