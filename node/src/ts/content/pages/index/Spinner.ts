import * as THREE from "three";
import { Vector3 } from "three";
import { SystemObject } from "../../../myLib/objects/SystemObject.js";
import { Game } from "../../../myLib/system/Game.js";
import { Util } from "../../../myLib/util/Util.js";

export class Spinner extends SystemObject {
  private spinObj: THREE.Mesh | THREE.Group;

  protected axis: THREE.Vector3;
  protected distance: number;
  protected duration: number;

  protected parent: THREE.Mesh | THREE.Group | undefined;
  protected center: THREE.Vector3 | undefined;

  constructor(options: {
    mesh: THREE.Mesh | THREE.Group;
    axis: THREE.Vector3;
    duration?: number;
    distance?: number;
    parent?: THREE.Mesh | THREE.Group;
    center?: THREE.Vector3;
  }) {
    const mesh = new THREE.Group();
    super(mesh);

    this.spinObj = options.mesh;
    this.distance = options.distance ?? 0;
    this.duration = options.duration || Infinity;
    this.axis = options.axis;
    this.parent = options.parent;
    this.center = options.center;

    const parent = this.spinObj.parent;
    parent?.add(this.mesh);
    this.mesh.add(this.spinObj);
    this.spinObj.up = this.axis;
    this.spinObj.translateX(-this.distance);

    if (this.center) {
      this.mesh.position.set(this.center.x, this.center.y, this.center.z);
    }
    if (this.parent) {
      const vec = this.parent.getWorldPosition(new THREE.Vector3());

      this.mesh.position.set(vec.x, vec.y, vec.z);
    }
  }

  update(dt: number) {
    const angle = (360 * dt) / this.duration;
    this.mesh.rotateOnAxis(this.axis, Util.math.convert.DegToRad(angle));
  }
}
