import { ControllableObject } from "../../../../lib/assets/objects/ControllableObject.js";
import { Color } from "../../../../lib/util/Color.js";
import { Triangulation } from "../../../../lib/physic/algorithms/Triangulation.js";
import { Util } from "../../../../lib/util/Util.js";
import { Polygon2Helper } from "../../../../lib/physic/algorithms/Polygon2Helper.js";
export class FormObject extends ControllableObject {
    constructor(pos, hitBox, angle) {
        super(pos, hitBox, angle);
        this.collides = false;
        this.selected = false;
        this.rotationSpeed = Util.math.random.between(45, 135);
        this.controlles.set("w", (dt) => {
            if (!this.selected)
                return;
            this.moveDirection(0, this.calc_valueChangeForDT((90 * 1) / this.game.getCamara().scaleValue, dt));
        });
        this.controlles.set("a", (dt) => {
            if (!this.selected)
                return;
            this.moveDirection(-90, this.calc_valueChangeForDT((90 * 1) / this.game.getCamara().scaleValue, dt));
        });
        this.controlles.set("s", (dt) => {
            if (!this.selected)
                return;
            this.moveDirection(180, this.calc_valueChangeForDT((90 * 1) / this.game.getCamara().scaleValue, dt));
        });
        this.controlles.set("d", (dt) => {
            if (!this.selected)
                return;
            this.moveDirection(90, this.calc_valueChangeForDT((90 * 1) / this.game.getCamara().scaleValue, dt));
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
    update2(dt) {
        this.rotate(this.calc_valueChangeForDT(this.rotationSpeed, dt));
        let objects = this.world.findObjectsInNeighbouringChunks(this.chunk, FormObject, this);
        for (let obj of objects) {
            this.collides = this.isCollidingWith(obj);
            if (this.collides)
                break;
        }
    }
    render(renderer) {
        renderer.setLineWidth(3);
        renderer.setStrokeColor(this.collides ? Color.get("white") : Color.get("black"));
        renderer.setFillColor(this.collides ? Color.get("white") : Color.get("black"));
        renderer.renderPolygon(this.pos, this.hitBox, this.orientation, true, true);
        renderer.setLineWidth(0.5);
        if (!this.hitBox.isConvex) {
            let parts = Triangulation.triangulate(this);
            for (let part of parts) {
                renderer.renderPolygon(part.pos, part.hitBox, part.orientation, false, true);
            }
        }
        renderer.setLineWidth(3);
        renderer.setStrokeColor(Color.get("black"));
        renderer.setFillColor(this.selected ? Color.get("black") : Color.none);
        renderer.renderCircle(this.pos, 10);
        renderer.setLineWidth(0.33);
        renderer.setFillColor(Color.none);
        renderer.renderCircle(this.pos, this.hitBox.farthestDistance);
    }
    translatePoints() {
        return Polygon2Helper.translatePoints(this.hitBox.model, this.pos, this.orientation);
    }
}
