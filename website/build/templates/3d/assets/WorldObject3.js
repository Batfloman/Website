import { SceneObject } from "../../assets/SceneObject.js";
import Vector3 from "../../util/Vector3.js";
export default class WorldObject3 extends SceneObject {
    constructor(center, hitBox) {
        super();
        this.pos = center;
        this.hitBox = hitBox;
    }
    update(dt) {
        throw new Error("Method not implemented.");
    }
    render(ctx) {
        throw new Error("Method not implemented.");
    }
    shouldRender() {
        return this.isOnScreen();
    }
    touches(obj) {
        throw new Error("Method not implemented.");
    }
    translatePoints() {
        let points = this.hitBox.translatePoints(this.pos);
        let vec = new Array();
        points.forEach(p => {
            vec.push(p.vec);
        });
        return vec;
    }
    isOnScreen() {
        return true;
    }
    calcPosOnScreen() {
        return new Vector3(this.pos.x - this.getCamara().offset.x, this.pos.y - this.getCamara().offset.y, this.pos.z);
    }
    rotate(degrees) {
        this.hitBox.rotate(degrees);
    }
}
