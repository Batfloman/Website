import { Polygon2 } from "../../../../old/web/content/lib/physic/boundingBox/Polygon2.js";
import { Util } from "../../../../old/web/content/lib/util/Util.js";
import { Vector2 } from "../../../../old/web/content/lib/util/Vector2.js";

export class Form extends Polygon2 {
  constructor(numVertices: number, radius: number, irregularity = 0) {
    let model: Vector2[] = [];

    for (let i = 0; i < numVertices; i++) {
      model.push(
        Util.moveDirection(
          new Vector2(),
          (360 / numVertices) * i,
          Form.randomDistance(radius, irregularity)
        )
      );
    }

    super(model);
  }

  private static randomDistance(normal: number, irregularity = 0): number {
    return Util.math.round(
      Util.math.random.between(-1, 2, 5) * normal * irregularity + normal,
      2
    );
  }
}
