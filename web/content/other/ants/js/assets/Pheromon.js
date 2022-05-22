import { WorldObject } from "../../../../lib/assets/Objects/WorldObject.js";
import Circle from "../../../../lib/physic/boundingBox/Circle.js";
import { Color } from "../../../../lib/util/Color.js";
const pheromonSize = 1;
const duration = 30000;
const colors = new Map([
    ["home", Color.get("red")],
    ["food", Color.get("blue")],
]);
export default class Pheromon extends WorldObject {
    constructor(pos, message) {
        super(pos, new Circle(pheromonSize));
        this.message = message;
        this.strength = 100;
        this.zIndex = 5;
    }
    update2(dt) {
        this.strength -= dt * (100 / duration);
        if (this.strength <= 0) {
            this.game.removeObject(this);
        }
    }
    render(renderer) {
        const color = colors.get(this.message);
        color === null || color === void 0 ? void 0 : color.setA(this.strength);
        renderer.setStrokeColor(color);
        renderer.setFillColor(color);
        renderer.renderCircle(this.pos, pheromonSize);
    }
}
