import { ControllableObject } from "../../../lib/assets/ControllableObject.js";
import { Color } from "../../../lib/util/Color.js";
export default class FormObject extends ControllableObject {
    constructor(pos, hitBox, angle) {
        super(pos, hitBox, angle);
        this.collides = false;
        this.selected = false;
        this.rotationSpeed = 0;
        this.controlles.set("w", (dt) => {
            if (!this.selected)
                return;
            this.moveDirection(0, this.calc_valueChangeForDT((90 * 1) / this.game.getCamara().scale, dt));
        });
        this.controlles.set("a", (dt) => {
            if (!this.selected)
                return;
            this.moveDirection(-90, this.calc_valueChangeForDT((90 * 1) / this.game.getCamara().scale, dt));
        });
        this.controlles.set("s", (dt) => {
            if (!this.selected)
                return;
            this.moveDirection(180, this.calc_valueChangeForDT((90 * 1) / this.game.getCamara().scale, dt));
        });
        this.controlles.set("d", (dt) => {
            if (!this.selected)
                return;
            this.moveDirection(90, this.calc_valueChangeForDT((90 * 1) / this.game.getCamara().scale, dt));
        });
        this.controlles.set("q", (dt) => {
            if (!this.selected)
                return;
            this.rotate(this.calc_valueChangeForDT(90, dt));
        });
        this.controlles.set("e", (dt) => {
            if (!this.selected)
                return;
            this.rotate(this.calc_valueChangeForDT(-90, dt));
        });
    }
    update(dt) {
        super.update(dt);
        this.rotate(this.calc_valueChangeForDT(this.rotationSpeed, dt));
        let objects = this.game.findObjects(FormObject, this);
        objects.forEach((obj) => {
            this.collides = this.checkCollision(obj);
            if (this.collides)
                return;
        });
    }
    render(renderer) {
        renderer.setLineWidth(3);
        renderer.setStrokeColor(this.collides ? Color.get("white") : Color.get("black"));
        renderer.polygon(this.pos, this.hitBox, this.orientation, true);
        renderer.setStrokeColor(Color.get("black"));
        renderer.setFillColor(this.selected ? Color.get("black") : Color.none);
        renderer.renderCircle(this.pos, 10);
    }
}
