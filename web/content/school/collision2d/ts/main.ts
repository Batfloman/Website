import Canvas from "../../../lib/display/Canvas.js";
import FormObject from "./FormObject.js";
import System from "./System.js";
import Util from "../../../lib/util/Util.js";
import Vector2 from "../../../lib/util/Vector2.js";
import Form from "./Form.js";
import Rectangle from "../../../lib/physic/boundingBox/Rectangel.js";
import Polygon2 from "../../../lib/physic/boundingBox/Polygon2.js";
import Polygon2Helper from "../../../lib/physic/algorithms/Polygon2Helper.js";

window.onload = () => {
  let s = new System(new Canvas(document.querySelector("canvas")));

  s.setCamaraMovementLock(false);
  s.setCamaraScaleLock(false);

  for (let i = 0; i < 50; i++) {
    s.addObject(createRandomShape());
  }

  s.start();
  // s.tick ();
};

function createRandomShape(): FormObject {
  let start = new Vector2(Util.randomBetween(-1000, 1000, 2), Util.randomBetween(-1000, 1000, 2));
  let form = new Form(
    Util.randomBetween(5, 20),
    Util.randomBetween(25, 75, 2),
    Util.randomBetween(0.5, 1, 2)
  );
  form.centerModel();
  return new FormObject(start, form);
}
