import { WorldObject } from "../../../../lib/assets/objects/WorldObject.js";
import Circle from "../../../../lib/physic/boundingBox/Circle.js";
import { Color } from "../../../../lib/util/Color.js";
const pheromonSize = 1;
const duration = 17500 * 5;
const colors = new Map([
    ["home", Color.get("red")],
    ["food", Color.get("blue")],
]);
export default class Pheromon extends WorldObject {
    constructor(pos, message) {
        super(pos, new Circle(pheromonSize));
        this.message = message;
        this.strength = 100;
        if (message == "home")
            this.zIndex = 5;
        if (message == "food")
            this.zIndex = 10;
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
        renderer.renderRectangle(this.pos, pheromonSize, pheromonSize);
    }
}
