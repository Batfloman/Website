import MoveableObject from "../../templates/assets/MovableObject.js";
import Formeln from "../../templates/Formeln.js";
import Input from "../../templates/input/Input.js";
import SAT from "../../templates/physic/2d/collision/SAT.js";
export default class FromObject extends MoveableObject {
    constructor(centerPos, hitBox) {
        let controles = new Map();
        controles.set("w", (dt) => { this.move(0, 100 * dt / 1000); });
        controles.set("s", (dt) => { this.move(180, 100 * dt / 1000); });
        controles.set("a", (dt) => { this.move(-90, 100 * dt / 1000); });
        controles.set("d", (dt) => { this.move(90, 100 * dt / 1000); });
        controles.set("q", (dt) => { this.rotate(-90 * dt / 1000); });
        controles.set("e", (dt) => { this.rotate(90 * dt / 1000); });
        super(centerPos, hitBox, controles);
        this.standardColor = "black";
        this.kollisionColor = "white";
        this.selectedColor = "black";
        this.standardWidth = 2;
        this.degPerSec = FromObject.randomSpeed(30, 180);
        Input.newEventListener("click", this, (event) => {
            let mPos = this.canvas.getMousePosWithViewOffSet();
            if (Formeln.distance(this.pos, mPos) < 10)
                this.lockMovement = !this.lockMovement;
        });
    }
    static randomSpeed(min, max) {
        let value;
        do {
            value = Math.random() * max * 2 - max;
        } while (value > -min && value < min);
        return value;
    }
    update(dt) {
        super.update(dt);
        this.rotate(this.degPerSec * dt / 1000);
    }
    testOverlap(objects) {
        for (let i = 0; i < objects.length; i++) {
            let overlap = (SAT.potentialCollision(this, objects[i]) && SAT.testCollision(this, objects[i]));
            if (overlap)
                return true;
        }
        return false;
    }
}
