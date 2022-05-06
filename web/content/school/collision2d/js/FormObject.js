import WorldObject from "../../../lib/assets/WorldObject.js";
import { Color } from "../../../lib/util/Color.js";
export default class FormObject extends WorldObject {
    constructor(pos, hitBox, angle) {
        super(pos, hitBox, angle);
    }
    update(dt) {
        this.rotate(this.calc_valueChangeForDT(45, dt));
    }
    render(renderer) {
        renderer.setLineWidth(2);
        renderer.setFillColor(Color.get("red"));
        renderer.polygon(this.pos, this.hitBox, this.orientation, true);
    }
}
