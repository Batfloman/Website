import { WorldObject } from "../../../myLib/objects/WorldObject.js";
import * as THREE from "three";
import { Util } from "../../../myLib/util/Util.js";

export class StarBody extends WorldObject {
  private spinAxis: THREE.Vector3;
  private duration: number;

  constructor(mesh: THREE.Mesh, pos: THREE.Vector3, axis = new THREE.Vector3(0, 1, 0), duration = Infinity) {
    super(mesh, pos);

    this.spinAxis = axis;
    this.duration = duration;
  }

  update(dt: number): void {
    const angle = Util.math.convert.dtToValue(dt, 2 * Math.PI, this.duration);
    this.threeObj.rotateOnAxis(this.spinAxis, angle);
  }
}
