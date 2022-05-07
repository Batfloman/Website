import Util from "../../util/Util.js";
import Vector2 from "../../util/Vector2.js";
import Polygon2 from "../boundingBox/Polygon2.js";
import ICollideable from "../property/ICollideable.js";

export default class Triangulation {
  static triangulate(obj: ICollideable): ICollideable[] {
    let vertices = obj.translatePoints();
    let tirangles: Triangle[] = [];

    let indexList: number[] = [];
    for (let i = 0; i < vertices.length; i++) {
      indexList.push(i);
    }

    // let counter = 0;
    // while (indexList.length > 3 || counter++ < 100) {
    //   for (let i = 0; i < indexList.length; i++) {
    //     let a = indexList[i];
    //     let b = Util.getItem(indexList, i - 1);
    //     let c = Util.getItem(indexList, i + 1);

    //     let va = vertices[a];
    //     let vb = vertices[b];
    //     let vc = vertices[c];

    //     let va_to_vb = vb.subtract(va);
    //     let va_to_vc = vc.subtract(va);

    //     // Is ear test vertex convex?
    //     if (va_to_vb.crossProduct(va_to_vc) > 0) continue;

    //     let isEar = true;

    //     // Does test ear contain any polygon vertecies?
    //     for (let j = 0; j < vertices.length; j++) {
    //       if (j == a || j == b || j == c) continue;

    //       let p = vertices[j];

    //       if (Triangulation.isPointInTriangle(p, vb, va, vc)) {
    //         isEar = false;
    //         break;
    //       }
    //     }

    //     if (isEar) {
    //       tirangles.push(
    //         new Triangle(obj.pos, new Polygon2([va, vb, vc]), obj.orientation)
    //       );

    //       indexList.splice(i, 1);
    //       break;
    //     }
    //   }
    // }

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

  static isPointInTriangle(
    p: Vector2,
    a: Vector2,
    b: Vector2,
    c: Vector2
  ): boolean {
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
    throw new Error("Method not implemented.");
  }
}
