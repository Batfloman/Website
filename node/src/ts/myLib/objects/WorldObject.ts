import { SystemObject } from "./SystemObject.js";
import * as THREE from "three";
import { Euler } from "three";
import { Util } from "../util/Util.js";

export abstract class WorldObject extends SystemObject {
  protected pos: THREE.Vector3;
  protected front: THREE.Euler;

  constructor(mesh: THREE.Mesh, pos: THREE.Vector3 | THREE.Vector2, front: THREE.Euler = new THREE.Euler()) {
    super(mesh);

    this.front = front;
    this.pos = pos instanceof THREE.Vector3 ? new THREE.Vector3().copy(pos) : new THREE.Vector3(pos.x, pos.y, 0);
    this.mesh.position.set(this.pos.x, this.pos.y, this.pos.z);
  }

  setPosition(vec3: THREE.Vector3): void {
    this.mesh.position.set(vec3.x, vec3.y, vec3.z);
    this.pos = vec3;
  }
  translate(x: number, y: number, z: number) {
    this.translateX(x);
    this.translateY(y);
    this.translateZ(z);
  }
  translateX(distance: number) {
    this.mesh.translateX(distance);
    this.pos.x = this.mesh.position.x;
  }
  translateY(distance: number) {
    this.mesh.translateY(distance);
    this.pos.y = this.mesh.position.y;
  }
  translateZ(distance: number) {
    this.mesh.translateZ(distance);
    this.pos.z = this.mesh.position.z;
  }
  scale(factor: number): void {
    this.mesh.scale.multiplyScalar(factor);
  }
  setScale(factor: number): void {
    this.mesh.scale.set(factor, factor, factor);
  }
  moveTowards(obj: WorldObject, distance: number = 0) {
    const vec = new THREE.Vector3().subVectors(obj.pos, this.pos);
    this.moveAlong(vec, distance);
  }
  moveAlong(axis: THREE.Vector3, distance: number = 0) {
    const movement = axis.normalize().multiplyScalar(distance);
    this.translate(movement.x, movement.y, movement.z);
  }
  move(distance: number) {
    const moveX = distance * Math.sin(this.front.z);
    const moveY = distance * Math.cos(this.front.z);
    const moveZ = distance * 0;

    this.translate(moveX, moveY, moveZ);
  }

  rotateAroundX(deg: number) {
    const rad = Util.math.convert.DegToRad(deg);
    this.front.set(this.front.x + rad, this.front.y, this.front.z);
  }
  rotateAroundY(deg: number) {
    const rad = Util.math.convert.DegToRad(deg);
    this.front.set(this.front.x, this.front.y + rad, this.front.z);
  }
  rotateAroundZ(deg: number) {
    const rad = Util.math.convert.DegToRad(deg);
    this.front.set(this.front.x, this.front.y, this.front.z + rad);
  }

  public get = {
    pos: (): THREE.Vector3 => this.pos,
  };
}
