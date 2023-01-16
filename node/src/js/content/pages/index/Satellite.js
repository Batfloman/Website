import { SystemObject } from "./../../../myLib/objects/SystemObject.js";
import { Util } from "./../../../myLib/util/Util.js";
export class Satellite extends SystemObject {
    axis;
    orbitDuration;
    constructor(mesh, axis, duration = Infinity) {
        super(mesh);
        this.axis = axis;
        this.orbitDuration = duration;
    }
    update(dt) {
        const angle = (360 * dt) / this.orbitDuration;
        this.mesh.rotateOnAxis(this.axis, Util.math.convert.DegToRad(angle));
    }
}
