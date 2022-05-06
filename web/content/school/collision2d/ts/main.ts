import Canvas from "../../../lib/display/Canvas.js"
import FormObject from "./FormObject.js";
import System from "./System.js";
import Util from "../../../lib/util/Util.js";
import Polygon2 from "../../../lib/physic/boundingBox/Polygon2.js";
import Vector2 from "../../../lib/util/Vector2.js";
import Form from "./Form.js";

window.onload = () => {
  let s = new System(new Canvas(document.querySelector("canvas")));

  s.setCamaraMovementLock(false);
  s.setCamaraScaleLock(false);

  for(let i = 0; i < 1; i++) {
    s.addObject(createRandomShape());
  }

  s.start();
  // s.tick ();
}

function createRandomShape(): FormObject {
  return new FormObject(
    new Vector2(
      Util.randomBetween(-0, 0, 2),
      Util.randomBetween(-0, 0, 2)
    ),
    new Form(
      Util.randomBetween(5, 5),
      // 1,
      Util.randomBetween(25, 75, 2),
      // 0,
      Util.randomBetween(0.5, 1, 2)
    )
  );
}
