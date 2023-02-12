import { WorldObject } from "../../../myLib/objects/WorldObject.js";
import { Util } from "../../../myLib/util/Util.js";
import * as THREE from "three";
import { StarBody } from "./StarBody.js";
import { Game } from "../../../myLib/system/Game.js";

export class Orbit extends WorldObject {
  private axis: THREE.Vector3;
  private around: THREE.Vector3 | WorldObject;
  private duration: number;
  private distance: number;

  constructor(
    starBody: StarBody,
    around: THREE.Vector3 | StarBody,
    axis: THREE.Vector3,
    duration: number,
    distance: number
  ) {
    const group = new THREE.Group();
    const parent = starBody.threeObj.parent;
    group.add(starBody.threeObj);
    if (parent) parent.add(group);

    const center = around instanceof THREE.Vector3 ? around : around.get.pos();

    super(group, center);

    this.axis = axis;
    this.around = around;
    this.duration = duration ?? 1000;
    this.distance = distance ?? 0;

    // move StarBody on rotation plane
    const plane = new THREE.Plane(axis);
    const planeHelper = new THREE.PlaneHelper(plane, 10);

    group.add(planeHelper);

    const projectedStarBodyPos = plane.projectPoint(starBody.get.pos(), new THREE.Vector3());
    if (projectedStarBodyPos.equals(center))
      console.warn("projected onto center => cannot face center => wrong movement");
    starBody.setPosition(projectedStarBodyPos);
    starBody.faceTowards(this.get.pos());
    const currentDistance = new THREE.Vector3().subVectors(center, starBody.get.pos()).length();
    starBody.move(currentDistance - this.distance);
  }

  update(dt: number): void {
    const angle = Util.math.convert.dtToValue(dt, 360, this.duration);
    const center = this.around instanceof THREE.Vector3 ? this.around : this.around.get.pos();
    this.setPosition(center);
    this.threeObj.rotateOnAxis(this.axis, Util.math.convert.DegToRad(angle));
  }
}
