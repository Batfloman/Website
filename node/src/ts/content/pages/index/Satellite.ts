import { SystemObject } from "./../../../myLib/objects/SystemObject.js";
import { Util } from "./../../../myLib/util/Util.js";

export class Satellite extends SystemObject {
  axis: THREE.Vector3;
  orbitDuration: number;

  constructor(mesh: THREE.Mesh | THREE.Group, axis: THREE.Vector3, duration: number = Infinity) {
    super(mesh);
    this.axis = axis;
    this.orbitDuration = duration;
  }

  update(dt: number) {
    const angle = (360 * dt) / this.orbitDuration;
    this.mesh.rotateOnAxis(this.axis, Util.math.convert.DegToRad(angle));
  }
}
