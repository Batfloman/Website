import MoveableObject from "../../templates/2d/assets/MovableObject.js";
import { SceneObject } from "../../templates/assets/SceneObject.js";
import Formeln from "../../templates/2d/Formeln2.js";
import Input from "../../templates/input/Input.js";
import CircleCollision from "../../templates/2d/collision/CircleCollision.js";
import SAT from "../../templates/2d/collision/SAT.js";
import Renderer from "../../templates/display/Renderer.js";
import WorldObject2 from "../../templates/2d/assets/WorldObject2.js";
import Polygon2Helper from "../../templates/2d/collision/Polygon2Helper.js";
import Triangulation from "../../templates/2d/collision/Triangulation.js";
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
        this.standardWidth = 1.75;
        this.drawPoints = false;
        this.drawTriangles = true;
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
        let borderColor = this.collides ? this.collisionColor : this.standardColor;
        let fillColor = this.lockMovement ? "rgba(0, 0, 0, 0)" : this.selectedColor;
        if (this.drawTriangles) {
            ctx.lineWidth = .25;
            if (!Polygon2Helper.isConvex(this.hitBox)) {
                Triangulation.triangulate(this.hitBox.model).forEach(triangle => {
                    Renderer.connectDots(ctx, this.getCamara().calcPointsPosOnScreen(Polygon2Helper.translatePoints(triangle.model, this.pos, this.angle)));
                });
            }
        }
        ctx.lineWidth = this.standardWidth;
        let fillColor2 = this.standardFillColor;
        Renderer.connectDots(ctx, this.calcPointsOnScreen(), borderColor, fillColor2);
        if (this.drawPoints) {
            Renderer.drawDots(ctx, this.calcPointsOnScreen());
        }
        ctx.beginPath();
        ctx.strokeStyle = "rgba(45, 45, 45, 10)";
        ctx.lineWidth = 0.75;
        ctx.arc(pos.x, pos.y, Formeln.distance(this.pos, this.getFarthestPoint()), 0, 360);
        ctx.stroke();
    }
    testOverlap(objects, exclude) {
        for (let i = 0; i < objects.length; i++) {
            let obj = objects[i];
            if (!(obj instanceof WorldObject2) || obj == this)
                continue;
            if (exclude instanceof SceneObject && exclude == obj)
                continue;
            else if (exclude instanceof Array && exclude.includes(obj))
                continue;
            let overlap = (CircleCollision.potentialCollision(this, obj) && SAT.testCollision(this, obj));
            if (overlap)
                return true;
        }
        return false;
    }
    static testOverlap(testObj, objects, exclude) {
        for (let i = 0; i < objects.length; i++) {
            let obj = objects[i];
            if (!(obj instanceof WorldObject2) || obj == testObj)
                continue;
            if (exclude instanceof SceneObject && exclude == obj)
                continue;
            else if (exclude instanceof Array && exclude.includes(obj))
                continue;
            let overlap = (CircleCollision.potentialCollision(testObj, obj) && SAT.testCollision(testObj, obj));
            if (overlap)
                return true;
        }
        return false;
    }
}
