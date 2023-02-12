import { SystemObject } from "./SystemObject.js";
import * as THREE from "three";
import { Util } from "../util/Util.js";

export abstract class WorldObject extends SystemObject {
  protected facing: THREE.Vector3;

  constructor(
    mesh: THREE.Object3D,
    pos: THREE.Vector3 | THREE.Vector2,
    facing: THREE.Vector3 = new THREE.Vector3(0, 1, 0)
  ) {
    super(mesh);

    this.facing = facing.normalize();
    this.setPosition(pos instanceof THREE.Vector3 ? new THREE.Vector3().copy(pos) : new THREE.Vector3(pos.x, pos.y, 0));
  }

  setPosition = (vec: THREE.Vector3) => this.threeObj.position.copy(vec);
  translate = (vec: THREE.Vector3) => this.threeObj.position.add(vec);
  translateX = (distance: number) => this.threeObj.position.add(new THREE.Vector3(distance, 0, 0));
  translateY = (distance: number) => this.threeObj.position.add(new THREE.Vector3(0, distance, 0));
  translateZ = (distance: number) => this.threeObj.position.add(new THREE.Vector3(0, 0, distance));
  scale = (factor: number) => this.threeObj.scale.multiplyScalar(factor);
  setScale = (factor: number) => this.threeObj.scale.set(factor, factor, factor);

  moveTowards(goal: WorldObject | THREE.Vector3, distance: number = 0) {
    const axisToGoal = new THREE.Vector3().subVectors(
      goal instanceof WorldObject ? goal.get.pos() : goal,
      this.get.pos()
    );
    this.moveAlongAxis(axisToGoal, distance);
  }
  moveAlongAxis(axis: THREE.Vector3, distance: number = 0) {
    const movement = axis.normalize().multiplyScalar(distance);
    this.translate(movement);
  }
  move(distance: number) {
    const movement = this.facing.normalize().multiplyScalar(distance);
    this.translate(movement);
  }

  rotateAboutX(deg: number) {
    const rad = Util.math.convert.DegToRad(deg);
    this.facing.applyEuler(new THREE.Euler(rad, 0, 0)).normalize();
  }
  rotateAboutY(deg: number) {
    const rad = Util.math.convert.DegToRad(deg);
    this.facing.applyEuler(new THREE.Euler(0, rad, 0)).normalize();
  }
  rotateAboutZ(deg: number) {
    const rad = Util.math.convert.DegToRad(deg);
    this.facing.applyEuler(new THREE.Euler(0, 0, rad)).normalize();
  }
  rotateOnAxis(axis: THREE.Vector3, deg: number) {
    const rad = Util.math.convert.DegToRad(deg);
    this.facing.applyAxisAngle(axis, rad).normalize();
  }
  rotateTowards(vec: THREE.Vector3, maxRotation = Infinity) {
    const direction = new THREE.Vector3().subVectors(vec, this.threeObj.position);
    const cross = new THREE.Vector3().crossVectors(this.facing, direction).normalize();

    if (cross.length() === 0) {
      console.warn("Directly Behind check not implemented yet");
    }

    const angle = Math.min(this.facing.angleTo(direction), Util.math.convert.DegToRad(maxRotation));

    this.facing.applyAxisAngle(cross, angle).normalize();
  }
  faceTowards(vec: THREE.Vector3) {
    this.facing.subVectors(vec, this.get.pos()).normalize();
    if (this.get.pos().equals(vec)) this.facing.set(0, 1, 0);
  }
  setFacing = (vec: THREE.Vector3) => this.facing.copy(vec.normalize());

  rotateAroundPoint(point: THREE.Vector3, axis: THREE.Vector3, deg: number) {
    const distance = new THREE.Vector3().subVectors(point, this.get.pos()).length();
    const facing = new THREE.Vector3().copy(this.facing);

    this.faceTowards(point);
    this.move(distance);
    this.rotateOnAxis(axis, deg);
    this.move(-distance);
    this.setFacing(facing);
  }
  rotateMeshAroundPoint(point: THREE.Vector3, axis: THREE.Vector3, deg: number) {
    const distance = new THREE.Vector3().subVectors(point, this.get.pos()).length();
    const facing = new THREE.Vector3().copy(this.facing);

    this.faceTowards(point);
    this.move(distance);
    this.threeObj.rotateOnAxis(axis, Util.math.convert.DegToRad(deg));
    this.rotateOnAxis(axis, deg);
    this.move(-distance);
    this.setFacing(facing);
  }

  public get = {
    pos: (): THREE.Vector3 => this.threeObj.getWorldPosition(new THREE.Vector3()),
    facing: (): THREE.Vector3 => new THREE.Vector3().copy(this.facing),
  };
}
