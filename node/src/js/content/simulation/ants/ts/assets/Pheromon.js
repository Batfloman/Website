import { WorldObject } from "../../../../lib/assets/objects/WorldObject.js";
import { Circle } from "../../../../lib/physic/boundingBox/Circle.js";
import { Color } from "../../../../lib/util/Color.js";
const pheromonSize = 0.5;
const duration = 35000;
const colors = new Map([
    ["home", Color.get("red")],
    ["food", Color.get("blue")],
]);
export class Pheromon extends WorldObject {
    message;
    strength;
    constructor(pos, message) {
        super(pos, new Circle(pheromonSize));
        this.message = message;
        this.strength = 100;
        if (message == "home")
            this.zIndex = 5;
        if (message == "food")
            this.zIndex = 10;
        const color = colors.get(this.message);
        this.color = !color ? Color.get("red") : color;
    }
    update(dt) {
        this.strength -= dt * (100 / duration);
        if (this.strength <= 0) {
            this.game.removeObject(this);
        }
    }
    render(renderer) {
        this.color?.setA(this.strength);
        renderer.setStrokeColor(this.color);
        renderer.setFillColor(this.color);
        renderer.renderRectangle(this.pos, pheromonSize * 2, pheromonSize * 2);
    }
    color;
    hiveId = 0;
    setColor(color) {
        this.color = color;
    }
    setHiveId(num) {
        this.hiveId = num;
    }
}
