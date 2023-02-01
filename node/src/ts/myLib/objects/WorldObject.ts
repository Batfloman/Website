import { SystemObject } from "./SystemObject.js";
import * as THREE from "three";
import { Util } from "../util/Util.js";

export abstract class WorldObject extends SystemObject {
  protected pos: THREE.Vector3;
  protected facing: THREE.Vector3;

  constructor(
    mesh: THREE.Mesh,
    pos: THREE.Vector3 | THREE.Vector2,
    facing: THREE.Vector3 = new THREE.Vector3(0, 1, 0)
  ) {
    super(mesh);

    this.facing = facing.normalize();
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
    const vec = new THREE.Vector3().copy(this.facing).multiplyScalar(distance);
    this.translate(vec.x, vec.y, vec.z);
  }

  rotateAroundX(deg: number) {
    const rad = Util.math.convert.DegToRad(deg);

    this.facing.applyEuler(new THREE.Euler(rad, 0, 0));
  }
  rotateAroundY(deg: number) {
    const rad = Util.math.convert.DegToRad(deg);
    this.facing.applyEuler(new THREE.Euler(0, rad, 0));
  }
  rotateAroundZ(deg: number) {
    const rad = Util.math.convert.DegToRad(deg);
    this.facing.applyEuler(new THREE.Euler(0, 0, rad));
  }

  rotateTowards(vec: THREE.Vector3, maxRotation = Infinity) {
    const direction = new THREE.Vector3().subVectors(vec, this.pos);
    const cross = new THREE.Vector3().crossVectors(this.facing, direction).normalize();

    if (cross.length() === 0) {
      console.warn("Directly Behind check not implemented yet");
    }

    const angle = Math.min(this.facing.angleTo(direction), Util.math.convert.DegToRad(maxRotation));

    this.facing.applyAxisAngle(cross, angle);
  }

  faceTowards(vec: THREE.Vector3) {
    this.facing.subVectors(vec, this.pos);
  }

  public get = {
    pos: (): THREE.Vector3 => this.pos,
  };
}
