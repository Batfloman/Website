import { SystemObject } from "./SystemObject.js";
import * as THREE from "three";
import { Util } from "../util/Util.js";
export class WorldObject extends SystemObject {
    facing;
    constructor(mesh, pos, facing = new THREE.Vector3(0, 1, 0)) {
        super(mesh);
        this.facing = facing.normalize();
        this.setPosition(pos instanceof THREE.Vector3 ? new THREE.Vector3().copy(pos) : new THREE.Vector3(pos.x, pos.y, 0));
    }
    setPosition = (vec) => this.threeObj.position.copy(vec);
    translate = (vec) => this.threeObj.position.add(vec);
    translateX = (distance) => this.threeObj.position.add(new THREE.Vector3(distance, 0, 0));
    translateY = (distance) => this.threeObj.position.add(new THREE.Vector3(0, distance, 0));
    translateZ = (distance) => this.threeObj.position.add(new THREE.Vector3(0, 0, distance));
    scale = (factor) => this.threeObj.scale.multiplyScalar(factor);
    setScale = (factor) => this.threeObj.scale.set(factor, factor, factor);
    moveTowards(goal, distance = 0) {
        const axisToGoal = new THREE.Vector3().subVectors(goal instanceof WorldObject ? goal.get.pos() : goal, this.get.pos());
        this.moveAlongAxis(axisToGoal, distance);
    }
    moveAlongAxis(axis, distance = 0) {
        const movement = axis.normalize().multiplyScalar(distance);
        this.translate(movement);
    }
    move(distance) {
        const movement = this.facing.normalize().multiplyScalar(distance);
        this.translate(movement);
    }
    rotateAboutX(deg) {
        const rad = Util.math.convert.DegToRad(deg);
        this.facing.applyEuler(new THREE.Euler(rad, 0, 0)).normalize();
    }
    rotateAboutY(deg) {
        const rad = Util.math.convert.DegToRad(deg);
        this.facing.applyEuler(new THREE.Euler(0, rad, 0)).normalize();
    }
    rotateAboutZ(deg) {
        const rad = Util.math.convert.DegToRad(deg);
        this.facing.applyEuler(new THREE.Euler(0, 0, rad)).normalize();
    }
    rotateOnAxis(axis, deg) {
        const rad = Util.math.convert.DegToRad(deg);
        this.facing.applyAxisAngle(axis, rad).normalize();
    }
    rotateTowards(vec, maxRotation = Infinity) {
        const direction = new THREE.Vector3().subVectors(vec, this.threeObj.position);
        const cross = new THREE.Vector3().crossVectors(this.facing, direction).normalize();
        if (cross.length() === 0) {
            console.warn("Directly Behind check not implemented yet");
        }
        const angle = Math.min(this.facing.angleTo(direction), Util.math.convert.DegToRad(maxRotation));
        this.facing.applyAxisAngle(cross, angle).normalize();
    }
    faceTowards(vec) {
        this.facing.subVectors(vec, this.get.pos()).normalize();
        if (this.get.pos().equals(vec))
            this.facing.set(0, 1, 0);
    }
    setFacing = (vec) => this.facing.copy(vec.normalize());
    rotateAroundPoint(point, axis, deg) {
        const distance = new THREE.Vector3().subVectors(point, this.get.pos()).length();
        const facing = new THREE.Vector3().copy(this.facing);
        this.faceTowards(point);
        this.move(distance);
        this.rotateOnAxis(axis, deg);
        this.move(-distance);
        this.setFacing(facing);
    }
    rotateMeshAroundPoint(point, axis, deg) {
        const distance = new THREE.Vector3().subVectors(point, this.get.pos()).length();
        const facing = new THREE.Vector3().copy(this.facing);
        this.faceTowards(point);
        this.move(distance);
        this.threeObj.rotateOnAxis(axis, Util.math.convert.DegToRad(deg));
        this.rotateOnAxis(axis, deg);
        this.move(-distance);
        this.setFacing(facing);
    }
    get = {
        pos: () => this.threeObj.getWorldPosition(new THREE.Vector3()),
        facing: () => new THREE.Vector3().copy(this.facing),
    };
}
