import MoveableObject from "../../templates/assets/MovableObject.js";
import WorldObject from "../../templates/assets/WorldObject.js";
import Formeln from "../../templates/Formeln.js";
import Input from "../../templates/input/Input.js";
import CircleCollision from "../../templates/physic/2d/collision/CircleCollision.js";
import SAT from "../../templates/physic/2d/collision/SAT.js";
export default class FormObject extends MoveableObject {
    constructor(centerPos, hitBox) {
        let controles = new Map();
        controles.set("w", (dt) => { this.move(0, 100 * dt / 1000); });
        controles.set("s", (dt) => { this.move(180, 100 * dt / 1000); });
        controles.set("a", (dt) => { this.move(-90, 100 * dt / 1000); });
        controles.set("d", (dt) => { this.move(90, 100 * dt / 1000); });
        controles.set("q", (dt) => { this.rotate(-90 * dt / 1000); });
        controles.set("e", (dt) => { this.rotate(90 * dt / 1000); });
        super(centerPos, hitBox, controles);
        this.collides = false;
        this.standardColor = "black";
        this.collisionColor = "white";
        this.selectedColor = "black";
        this.standardWidth = 2;
        this.degPerSec = FormObject.randomSpeed(30, 180);
        Input.newEventListener("mousedown", this, (event) => {
            let mPos = Input.mPosHover.add(this.getCamara().offset);
            let distance = Formeln.distance(this.pos, mPos);
            if (distance < 10) {
                this.lockMovement = !this.lockMovement;
            }
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
        var _a;
        super.update(dt);
        this.rotate(this.degPerSec * dt / 1000);
        let objects = (_a = this.system.activeScene) === null || _a === void 0 ? void 0 : _a.findObjects(FormObject);
        if (!!objects)
            this.collides = this.testOverlap(objects);
    }
    render(ctx) {
        let pos = this.calcPosOnScreen();
        this.hitBox.translatePoints(pos);
        ctx.strokeStyle = this.collides ? this.collisionColor : this.standardColor;
        ctx.fillStyle = this.lockMovement ? "rgba(0, 0, 0, 0)" : this.selectedColor;
        ctx.lineWidth = 1.75;
        ctx.beginPath();
        let first = this.hitBox.points[0];
        ctx.moveTo(first.x, first.y);
        this.hitBox.points.forEach(point => {
            ctx.lineTo(point.x, point.y);
        });
        ctx.lineTo(first.x, first.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 10, 0, 360);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "rgba(45, 45, 45, 10)";
        ctx.lineWidth = 0.75;
        ctx.arc(pos.x, pos.y, Formeln.distance(this.pos, this.getFarthestPoint()), 0, 360);
        ctx.stroke();
    }
    testOverlap(objects) {
        for (let i = 0; i < objects.length; i++) {
            let obj = objects[i];
            if (!(obj instanceof WorldObject) || obj == this)
                continue;
            let overlap = (CircleCollision.potentialCollision(this, obj) && SAT.testCollision(this, obj));
            if (overlap)
                return true;
        }
        return false;
    }
}
