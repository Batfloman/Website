import { Util } from "../../util/Util.js";
import { Vector2 } from "../../util/Vector2.js";
import { Polygon2 } from "../boundingBox/Polygon2.js";
import { ICollideable } from "../property/ICollideable.js";

export class PointInPolygon {
  static isPointInsidePolygon(point: Vector2, polygon: ICollideable | Vector2[]) {
    const vertices = polygon instanceof Array ? polygon : polygon.translatePoints();

    console.log("/========");
    console.log(point);
    for (let i in vertices) {
      let index = Number.parseInt(i);

      const a = Util.array.getItem(vertices, index);
      const b = Util.array.getItem(vertices, index - 1);

      const a_to_b = b.subtract(a);
      const a_to_p = point.subtract(a);

      console.log(a);
      console.log(a_to_p);

      const cross = a_to_b.crossProduct(a_to_p);

      console.log(cross);
    }
  }
}
