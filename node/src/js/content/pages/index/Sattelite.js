import { WorldObject } from "../../../myLib/objects/WorldObject.js";
import { Util } from "../../../myLib/util/Util.js";
import * as THREE from "three";
import { Game } from "../../../myLib/system/Game.js";
export class Spinner extends WorldObject {
    axis;
    around;
    duration;
    distance;
    constructor(mesh, options) {
        super(mesh, new THREE.Vector3(0, 0, 0));
        this.axis = options.axis;
        this.around = options.around;
        this.duration = options.duration ?? 1000;
        this.distance = options.distance ?? 0;
        const plane = new THREE.Plane(this.axis);
        const planeHelper = new THREE.PlaneHelper(plane, 10);
        const projectedPos = plane.projectPoint(this.mesh.position, new THREE.Vector3());
        this.setPosition(projectedPos);
        const distance = new THREE.Vector3().subVectors(this.around, this.get.pos()).length();
        this.faceTowards(this.around);
        this.move(distance - this.distance);
        Game.instance.get.scene().add(planeHelper);
    }
    update(dt) {
        const angle = Util.math.convert.dtToValue(dt, 360, this.duration);
        const center = this.around instanceof THREE.Vector3 ? this.around : this.around.getWorldPosition(new THREE.Vector3());
        this.rotateMeshAroundPoint(center, this.axis, angle);
    }
}
