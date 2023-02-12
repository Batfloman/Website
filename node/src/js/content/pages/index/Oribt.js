import { WorldObject } from "../../../myLib/objects/WorldObject.js";
import { Util } from "../../../myLib/util/Util.js";
import * as THREE from "three";
export class Satellite extends WorldObject {
    axis;
    around;
    duration;
    distance;
    constructor(starBody, around, axis, duration, distance) {
        const group = new THREE.Group();
        const parent = starBody.threeObj.parent;
        group.add(starBody.threeObj);
        if (parent)
            parent.add(group);
        super(group, around);
        this.axis = axis;
        this.around = around;
        this.duration = duration ?? 1000;
        this.distance = distance ?? 0;
        // move StarBody on rotation plane
        const plane = new THREE.Plane(axis);
        const projectedStarBodyPos = plane.projectPoint(starBody.get.pos(), new THREE.Vector3());
        starBody.setPosition(projectedStarBodyPos);
        starBody.faceTowards(this.get.pos());
        const center = this.around;
        const currentDistance = new THREE.Vector3().subVectors(center, starBody.get.pos()).length();
        starBody.move(currentDistance - this.distance);
    }
    update(dt) {
        const angle = Util.math.convert.dtToValue(dt, 360, this.duration);
        const center = this.around instanceof THREE.Vector3 ? this.around : this.around.get.pos();
        // this.rotateMeshAroundPoint(center, this.axis, angle);
    }
}
