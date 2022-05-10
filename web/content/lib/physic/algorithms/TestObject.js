import { WorldObject } from "../../assets/WorldObject.js";
import Polygon2Helper from "./Polygon2Helper.js";
export default class TestObject extends WorldObject {
    constructor(pos, hitBox, angle) {
        super(pos, hitBox, angle);
    }
    update(dt) { }
    render(renderer) { }
    translatePoints() {
        return Polygon2Helper.translatePoints(this.hitBox.model, this.pos, this.orientation);
    }
}
