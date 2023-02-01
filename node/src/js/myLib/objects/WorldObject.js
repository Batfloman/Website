import { SystemObject } from "./SystemObject.js";
import * as THREE from "three";
import { Util } from "../util/Util.js";
export class WorldObject extends SystemObject {
    pos;
    facing;
    constructor(mesh, pos, facing = new THREE.Vector3(0, 1, 0)) {
        super(mesh);
        this.facing = facing.normalize();
        this.pos = pos instanceof THREE.Vector3 ? new THREE.Vector3().copy(pos) : new THREE.Vector3(pos.x, pos.y, 0);
        this.mesh.position.set(this.pos.x, this.pos.y, this.pos.z);
    }
    setPosition(vec3) {
        this.mesh.position.set(vec3.x, vec3.y, vec3.z);
        this.pos = vec3;
    }
    translate(x, y, z) {
        this.translateX(x);
        this.translateY(y);
        this.translateZ(z);
    }
    translateX(distance) {
        this.mesh.translateX(distance);
        this.pos.x = this.mesh.position.x;
    }
    translateY(distance) {
        this.mesh.translateY(distance);
        this.pos.y = this.mesh.position.y;
    }
    translateZ(distance) {
        this.mesh.translateZ(distance);
        this.pos.z = this.mesh.position.z;
    }
    scale(factor) {
        this.mesh.scale.multiplyScalar(factor);
    }
    setScale(factor) {
        this.mesh.scale.set(factor, factor, factor);
    }
    moveTowards(obj, distance = 0) {
        const vec = new THREE.Vector3().subVectors(obj.pos, this.pos);
        this.moveAlong(vec, distance);
    }
    moveAlong(axis, distance = 0) {
        const movement = axis.normalize().multiplyScalar(distance);
        this.translate(movement.x, movement.y, movement.z);
    }
    move(distance) {
        const vec = new THREE.Vector3().copy(this.facing).multiplyScalar(distance);
        this.translate(vec.x, vec.y, vec.z);
    }
    rotateAroundX(deg) {
        const rad = Util.math.convert.DegToRad(deg);
        this.facing.applyEuler(new THREE.Euler(rad, 0, 0));
    }
    rotateAroundY(deg) {
        const rad = Util.math.convert.DegToRad(deg);
        this.facing.applyEuler(new THREE.Euler(0, rad, 0));
    }
    rotateAroundZ(deg) {
        const rad = Util.math.convert.DegToRad(deg);
        this.facing.applyEuler(new THREE.Euler(0, 0, rad));
    }
    rotateTowards(vec, maxRotation = Infinity) {
        const direction = new THREE.Vector3().subVectors(vec, this.pos);
        const cross = new THREE.Vector3().crossVectors(this.facing, direction).normalize();
        if (cross.length() === 0) {
            console.warn("Directly Behind check not implemented yet");
        }
        const angle = Math.min(this.facing.angleTo(direction), Util.math.convert.DegToRad(maxRotation));
        this.facing.applyAxisAngle(cross, angle);
    }
    faceTowards(vec) {
        this.facing.subVectors(vec, this.pos);
    }
    get = {
        pos: () => this.pos,
    };
}
