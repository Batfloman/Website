import { SystemObject } from "./SystemObject.js";
import * as THREE from "three";
import { Util } from "../util/Util.js";
export class WorldObject extends SystemObject {
    pos;
    front;
    constructor(mesh, pos, front = new THREE.Euler()) {
        super(mesh);
        this.front = front;
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
        const moveX = distance * Math.sin(this.front.z);
        const moveY = distance * Math.cos(this.front.z);
        const moveZ = distance * 0;
        this.translate(moveX, moveY, moveZ);
    }
    rotateAroundX(deg) {
        const rad = Util.math.convert.DegToRad(deg);
        this.front.set(this.front.x + rad, this.front.y, this.front.z);
    }
    rotateAroundY(deg) {
        const rad = Util.math.convert.DegToRad(deg);
        this.front.set(this.front.x, this.front.y + rad, this.front.z);
    }
    rotateAroundZ(deg) {
        const rad = Util.math.convert.DegToRad(deg);
        this.front.set(this.front.x, this.front.y, this.front.z + rad);
    }
    get = {
        pos: () => this.pos,
    };
}
