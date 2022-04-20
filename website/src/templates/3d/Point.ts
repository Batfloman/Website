import Vector3 from "../util/Vector3";

export default class Point {
  vec: Vector3;
  connectedTo: Vector3[] = new Array();

  constructor(pos: Vector3, connected?: Vector3[]) {
    this.vec = pos;
    this.connectedTo = !connected ? new Array() : connected;
  }

  connectTo(point: Vector3) {
    this.connectedTo.push(point);
  }
}