import Util from "../../util/Util.js";
import Vector2 from "../../util/Vector2.js";
import Polygon2Helper from "../algorithms/Polygon2Helper.js";
import Polygon from "./Polygon2.js";

export default class Rectangel extends Polygon {
  constructor(width: number, height: number) {
    let model = [
      new Vector2(0, 0),
      new Vector2(0, height),
      new Vector2(width, height),
      new Vector2(width, 0)
    ];

    super(model);

    this.centerModel();
  }
}