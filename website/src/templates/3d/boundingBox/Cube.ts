import Vector3 from "../../util/Vector3.js";
import Cuboid from "./Cuboid.js";

export default class Cube extends Cuboid {
  constructor(sideLength: number, startAngle?: Vector3) {
    super(sideLength, sideLength, sideLength, startAngle);

    this.centerModel();
  }
}