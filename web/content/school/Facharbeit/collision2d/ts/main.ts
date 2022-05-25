import Canvas from "../../../../lib/display/Canvas.js";
import FormObject from "./FormObject.js";
import System from "./System.js";
import Util from "../../../../lib/util/Util.js";
import Vector2 from "../../../../lib/util/Vector2.js";
import Form from "./Form.js";
import { Color } from "../../../../lib/util/Color.js";

window.onload = () => {
  let s = new System(new Canvas(document.querySelector("canvas")));

  s.setCamaraMovementLock(false);
  s.setCamaraScaleLock(false);
  s.setMaxUpdateDistance(2000);

  for (let i = 0; i < 500; i++) {
    s.addObject(createRandomShape());
  }

  // let form = new FormObject(
  //   new Vector2(-100, 0),
  //   new Polygon2([
  //     new Vector2(0, 100),
  //     new Vector2(200, 120),
  //     new Vector2(10, 0),
  //     new Vector2(200, -120),
  //     new Vector2(0, -100),
  //     new Vector2(-100, 0),
  //   ]),
  //   0
  // );
  // form.rotationSpeed = 0;
  // s.addObject(form);

  // let form2 = new FormObject(
  //   new Vector2(100, 0),
  //   new Polygon2([
  //     new Vector2(0, 100),
  //     new Vector2(200, 120),
  //     new Vector2(10, 0),
  //     new Vector2(200, -120),
  //     new Vector2(0, -100),
  //     new Vector2(-100, 0),
  //   ])
  // )
  // form2.selected = true;
  // form2.rotationSpeed = 0;
  // s.addObject(form2);

  s.start();
  // s.tick();
};

function createRandomShape(): FormObject {
  let start = new Vector2(
    Util.math.randomBetween(-5000, 5000, 2),
    Util.math.randomBetween(-5000, 5000, 2)
  );
  let form = new Form(
    Util.math.randomBetween(4, 15),
    Util.math.randomBetween(25, 75, 2),
    Util.math.randomBetween(1, 1, 2)
  );
  form.centerModel();
  return new FormObject(start, form, Util.math.randomBetween(0, 360));
}
