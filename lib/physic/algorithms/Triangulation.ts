import Util from "../../util/Util.js";
import Vector2 from "../../util/Vector2.js";
import Polygon2 from "../boundingBox/Polygon2.js";
import ICollideable from "../property/ICollideable.js";
import Polygon2Helper from "./Polygon2Helper.js";

export default class Triangulation {
  static triangulate(obj: ICollideable): ICollideable[] {
    const vertices = obj.hitBox.model;
    const windung = Polygon2Helper.findWindung(obj.hitBox);

    const tirangles: Triangle[] = [];

    const indexList: number[] = [];
    for (let i = 0; i < vertices.length; i++) {
      indexList.push(i);
    }

    while (indexList.length > 3) {
      for (let i = 0; i < indexList.length; i++) {
        const i1 = Util.getItem(indexList, i - 1);
        const i2 = Util.getItem(indexList, i);
        const i3 = Util.getItem(indexList, i + 1);

        const va = vertices[i1];
        const vb = vertices[i2];
        const vc = vertices[i3];

        const vb_to_va = va.subtract(vb);
        const vb_to_vc = vc.subtract(vb);

        // Is ear test vertex convex?
        if (!Polygon2Helper.isConvex(windung, vb_to_va.crossProduct(vb_to_vc))) continue;

        let isEar = true;

        // Does test ear contain any polygon vertecies?
        for (let j = 0; j < vertices.length; j++) {
          if (j == i1 || j == i2 || j == i3) continue;

          let p = vertices[j];

          if (Triangulation.isPointInTriangle(p, vb, va, vc)) {
            isEar = false;
            break;
          }
        }

        if (!isEar) continue;

        tirangles.push(
          new Triangle(
            obj.pos,
            new Polygon2([va, vb, vc]),
            obj.orientation
          )
        );

        Util.removeItemAtIndex(indexList, i);
        break;
      }
    }
    tirangles.push(
      new Triangle(
        obj.pos,
        new Polygon2([
          vertices[indexList[0]],
          vertices[indexList[1]],
          vertices[indexList[2]],
        ]),
        obj.orientation
      )
    );

    return tirangles;
  }

  static isPointInTriangle(p: Vector2, a: Vector2, b: Vector2, c: Vector2): boolean {
    let ab = b.subtract(a);
    let bc = c.subtract(b);
    let ca = a.subtract(c);

    let ap = p.subtract(a);
    let bp = p.subtract(b);
    let cp = p.subtract(c);

    let cross1 = ab.crossProduct(ap);
    let cross2 = bc.crossProduct(bp);
    let cross3 = ca.crossProduct(cp);

    if (cross1 < 0 || cross2 < 0 || cross3 < 0) return false;
    return true;
  }
}

class Triangle implements ICollideable {
  pos: Vector2;
  hitBox: Polygon2;
  orientation: number;

  constructor(pos: Vector2, hitBox: Polygon2, angle: number = 0) {
    this.pos = pos;
    this.hitBox = hitBox;
    this.orientation = angle;
  }

  checkCollision(other: ICollideable): boolean {
    throw new Error("Method not implemented.");
  }
  translatePoints(): Vector2[] {
    return Polygon2Helper.translatePoints(this.hitBox.model, this.pos, this.orientation);
  }
}
