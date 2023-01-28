import * as THREE from "three";
import { SystemObject } from "../../../myLib/objects/SystemObject.js";
import { Util } from "../../../myLib/util/Util.js";
export class Spinner extends SystemObject {
    spinObj;
    axis;
    distance;
    duration;
    parent;
    center;
    constructor(options) {
        const mesh = new THREE.Group();
        super(mesh);
        this.spinObj = options.mesh;
        this.distance = options.distance ?? 0;
        this.duration = options.duration || Infinity;
        this.axis = options.axis;
        this.parent = options.parent;
        this.center = options.center;
        const parent = this.spinObj.parent;
        parent?.add(this.mesh);
        this.mesh.add(this.spinObj);
        this.spinObj.up = this.axis;
        this.spinObj.translateX(-this.distance);
        if (this.center) {
            this.mesh.position.set(this.center.x, this.center.y, this.center.z);
        }
        if (this.parent) {
            const vec = this.parent.getWorldPosition(new THREE.Vector3());
            this.mesh.position.set(vec.x, vec.y, vec.z);
        }
    }
    update(dt) {
        const angle = (360 * dt) / this.duration;
        this.mesh.rotateOnAxis(this.axis, Util.math.convert.DegToRad(angle));
    }
}
