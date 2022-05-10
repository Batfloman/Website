import Input from "../input/Input.js";
import Polygon2Helper from "../physic/algorithms/Polygon2Helper.js";
import Rectangel from "../physic/boundingBox/Rectangel.js";
import { UIObject } from "./UIObject.js";
export default class UIButton extends UIObject {
    constructor(pos, width, height, action) {
        let hitBox = new Rectangel(width, height);
        super(pos, hitBox, 0);
        this.func = action;
        Input.newEventListener("click", this, (event) => {
        });
    }
    update(dt) { }
    render(renderer) {
        renderer.renderPolygon(this.pos, this.hitBox, 0, false, true);
    }
    translatePoints() {
        return Polygon2Helper.translatePoints(this.hitBox.model, this.pos, this.orientation);
    }
    action() {
        this.func.call(this);
    }
}
